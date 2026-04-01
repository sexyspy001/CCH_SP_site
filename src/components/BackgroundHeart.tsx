import { useEffect, useRef } from 'react';

export default function BackgroundHeart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Node = {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      phase: number;
      orbit: number;
    };

    const nodes: Node[] = [];
    const nodeCount = 68;
    let mouseX = width * 0.5;
    let mouseY = height * 0.4;
    let raf = 0;

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resetNodes = () => {
      nodes.length = 0;
      for (let index = 0; index < nodeCount; index += 1) {
        const band = index / nodeCount;
        nodes.push({
          x: width * (0.15 + Math.random() * 0.7),
          y: height * (0.1 + Math.random() * 0.75),
          radius: 1.4 + Math.random() * 3.2,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.16,
          phase: Math.random() * Math.PI * 2,
          orbit: 18 + band * 36 + Math.random() * 14,
        });
      }
    };

    const drawGlow = (x: number, y: number, radius: number, color: string, alpha: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color.replace('ALPHA', String(alpha)));
      gradient.addColorStop(1, color.replace('ALPHA', '0'));
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const handlePointerMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleResize = () => {
      setCanvasSize();
      resetNodes();
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const heroCenterX = width * 0.5 + (mouseX - width * 0.5) * 0.03;
      const heroCenterY = height * 0.32 + (mouseY - height * 0.35) * 0.015;

      drawGlow(heroCenterX, heroCenterY, Math.min(width, height) * 0.28, 'rgba(249, 115, 22, ALPHA)', 0.12);
      drawGlow(heroCenterX + 140, heroCenterY - 40, Math.min(width, height) * 0.18, 'rgba(15, 23, 42, ALPHA)', 0.07);

      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        const swayX = Math.cos(time * 0.0003 + node.phase) * node.orbit;
        const swayY = Math.sin(time * 0.00045 + node.phase) * node.orbit * 0.55;
        const currentX = node.x + swayX + node.speedX * time * 0.02;
        const currentY = node.y + swayY + node.speedY * time * 0.02;

        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j];
          const otherX = other.x + Math.cos(time * 0.0003 + other.phase) * other.orbit + other.speedX * time * 0.02;
          const otherY = other.y + Math.sin(time * 0.00045 + other.phase) * other.orbit * 0.55 + other.speedY * time * 0.02;
          const dx = otherX - currentX;
          const dy = otherY - currentY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const alpha = (1 - distance / 120) * 0.12;
            ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(currentX, currentY);
            ctx.lineTo(otherX, otherY);
            ctx.stroke();
          }
        }

        const mouseDistance = Math.hypot(mouseX - currentX, mouseY - currentY);
        const pulse = 1 + Math.sin(time * 0.002 + node.phase) * 0.18;
        const size = node.radius * pulse + (mouseDistance < 160 ? 1.4 : 0);

        ctx.fillStyle = mouseDistance < 160 ? 'rgba(249, 115, 22, 0.55)' : 'rgba(249, 115, 22, 0.24)';
        ctx.beginPath();
        ctx.arc(currentX, currentY, size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = window.requestAnimationFrame(render);
    };

    setCanvasSize();
    resetNodes();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handlePointerMove);
    raf = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
}
