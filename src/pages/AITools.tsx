import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, CheckCircle2, Image as ImageIcon, Lightbulb, LockKeyhole, Search, Sparkles, Upload, Wand2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { siteConfig, whatsappUrl } from '../siteConfig';

type PlatformOption = 'Amazon' | 'Flipkart' | 'Meesho' | 'Quick Commerce' | 'Multi-platform';
type GoalOption = 'Scale sales' | 'Improve visibility' | 'Reduce ACOS' | 'Fix operations' | 'Launch new products';
type StageOption = 'Getting started' | 'Scaling steadily' | 'Stuck at a plateau' | 'Expanding to new marketplaces';
type UtilityMode = 'resize' | 'background';
type ToolTab = 'utility' | 'recommender' | 'audit' | 'product';
type LeadForm = { name: string; email: string; phone: string; businessType: string };
type Recommendation = { title: string; summary: string; points: string[]; href: string; label: string };
type AuditResult = { strengths: string[]; risks: string[]; suggestions: string[] };

type Suggestion = { name: string; channel: string; angle: string; why: string };

const TOOL_ACCESS_KEY = 'cch-tool-access';
const TOOL_SESSION_KEY = 'cch-tool-session';
const LOCAL_API_BASE = typeof window !== 'undefined' && ['127.0.0.1', 'localhost'].includes(window.location.hostname) ? 'http://127.0.0.1:3011/api' : '/api';
const platforms: PlatformOption[] = ['Amazon', 'Flipkart', 'Meesho', 'Quick Commerce', 'Multi-platform'];
const goals: GoalOption[] = ['Scale sales', 'Improve visibility', 'Reduce ACOS', 'Fix operations', 'Launch new products'];
const stages: StageOption[] = ['Getting started', 'Scaling steadily', 'Stuck at a plateau', 'Expanding to new marketplaces'];
const categories = ['Beauty', 'Home & Kitchen', 'Nutrition', 'Fashion Accessories', 'Baby Care'];
const audiences = ['Mass premium', 'Value seekers', 'Urban convenience buyers', 'Health-focused shoppers'];

const getSavedLead = (): LeadForm | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(TOOL_ACCESS_KEY);
    return raw ? (JSON.parse(raw) as LeadForm) : null;
  } catch {
    return null;
  }
};

const saveLead = (lead: LeadForm) => {
  if (typeof window !== 'undefined') localStorage.setItem(TOOL_ACCESS_KEY, JSON.stringify(lead));
};

const recommend = (platform: PlatformOption, goal: GoalOption, stage: StageOption, issues: string): Recommendation => {
  const text = issues.toLowerCase();
  if (platform === 'Amazon' && (goal === 'Improve visibility' || text.includes('listing'))) return { title: 'Amazon Cataloging + Listing SEO', summary: 'Your next win is stronger indexing, listing structure, and conversion messaging.', points: ['SEO-rich titles and bullets', 'Catalog structure review', 'Image-message alignment'], href: '/amazon-cataloging-service', label: 'Explore Amazon Cataloging' };
  if ((platform === 'Amazon' || platform === 'Multi-platform') && goal === 'Reduce ACOS') return { title: 'Marketplace PPC Performance Plan', summary: 'You need tighter campaign structure and cleaner search-term control before spending more.', points: ['Bid and keyword cleanup', 'Campaign restructuring', 'Profit-focused optimisation'], href: '/marketplace-ppc-management', label: 'View PPC Management' };
  if (platform === 'Flipkart') return { title: 'Flipkart Account Management', summary: 'Flipkart growth improves when catalog, offers, and operations are managed together.', points: ['Catalog and offer optimisation', 'FBF readiness', 'Account health tracking'], href: '/flipkart-account-management-service', label: 'See Flipkart Management' };
  if (platform === 'Quick Commerce') return { title: 'Quick Commerce Launch Blueprint', summary: 'Quick commerce needs speed-first catalog planning and onboarding precision.', points: ['Assortment planning', 'Onboarding flow', 'City-level availability strategy'], href: '/quick-commerce', label: 'Explore Quick Commerce' };
  if (stage === 'Getting started' || goal === 'Launch new products') return { title: 'Ecommerce Launch + Consulting', summary: 'You need platform choice, compliance, listing readiness, and a launch roadmap.', points: ['Launch roadmap', 'Platform selection', 'Commercial readiness'], href: '/ecommerce-business-consulting', label: 'See Consulting Support' };
  return { title: 'End-to-End Marketplace Growth', summary: 'A blended growth system covering catalog quality, ads, operations, and expansion will create the biggest lift.', points: ['Cross-platform growth planning', 'Revenue and operations alignment', 'Execution support'], href: '/services', label: 'View Full Services' };
};

const auditListing = (title: string, bullets: string, description: string): AuditResult => {
  const bulletCount = bullets.split('\n').map((x) => x.trim()).filter(Boolean).length;
  const strengths = [title.trim().length >= 70 ? 'The title has enough room to carry strong search intent and feature context.' : 'The listing already has a workable draft that can be sharpened quickly.'];
  const risks = [title.trim().length < 70 ? 'The title is short and may miss important keyword coverage.' : 'The structure is usable, but message clarity can still improve.'];
  const suggestions = [bulletCount < 4 ? 'Add 5 bullets with one clear benefit or objection handler per line.' : 'Refine each bullet around one compelling buyer reason to choose the product.'];
  if (description.trim().length < 300) suggestions.push('Expand the description with use cases, trust signals, and product differentiators.');
  if (!/premium|durable|tested|trusted|engineered/i.test(`${title} ${bullets} ${description}`)) suggestions.push('Add stronger authority language to improve conversion confidence.');
  return { strengths, risks, suggestions };
};

const ideas = (category: string, audience: string, platform: PlatformOption, budget: string): Suggestion[] => [
  { name: `${category} starter bundle`, channel: platform, angle: 'Bundle-led value proposition', why: `${audience} buyers often respond well to clear bundled value and a simple first-buy decision.` },
  { name: `Premium ${category.toLowerCase()} hero SKU`, channel: platform === 'Meesho' ? 'Amazon + Flipkart' : platform, angle: 'Hero-SKU review concentration', why: `A hero SKU helps focus reviews, ad spend, and content quality. Budget reference: Rs. ${budget}.` },
  { name: `${category} repeat-purchase line`, channel: platform === 'Quick Commerce' ? 'Blinkit / Instamart' : 'Marketplace + D2C hybrid', angle: 'Retention-friendly positioning', why: 'Repeat-purchase products create better lifetime value and make ad economics easier to defend.' },
];

export default function AITools() {
  const [tab, setTab] = useState<ToolTab>('utility');
  const [platform, setPlatform] = useState<PlatformOption>('Amazon');
  const [goal, setGoal] = useState<GoalOption>('Scale sales');
  const [stage, setStage] = useState<StageOption>('Scaling steadily');
  const [issues, setIssues] = useState('Low visibility and inconsistent ad returns');
  const [title, setTitle] = useState('');
  const [bullets, setBullets] = useState('');
  const [description, setDescription] = useState('');
  const [showAudit, setShowAudit] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [category, setCategory] = useState(categories[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [budget, setBudget] = useState('50000');
  const [utilityMode, setUtilityMode] = useState<UtilityMode>('resize');
  const [width, setWidth] = useState('2000');
  const [height, setHeight] = useState('2000');
  const [quality, setQuality] = useState('0.92');
  const [outputFormat, setOutputFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png');
  const [threshold, setThreshold] = useState('235');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [processedUrl, setProcessedUrl] = useState('');
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [processedSize, setProcessedSize] = useState<number | null>(null);
  const [downloadName, setDownloadName] = useState('click-commerce-hub-output');
  const [processing, setProcessing] = useState(false);
  const [processError, setProcessError] = useState('');
  const [leadForm, setLeadForm] = useState<LeadForm>({ name: '', email: '', phone: '', businessType: '' });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [leadError, setLeadError] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [sessionToken, setSessionToken] = useState('');
  const fileRef = useRef<HTMLInputElement | null>(null);

  const recommendation = useMemo(() => recommend(platform, goal, stage, issues), [platform, goal, stage, issues]);
  const audit = useMemo(() => auditListing(title, bullets, description), [title, bullets, description]);
  const productIdeas = useMemo(() => ideas(category, audience, platform, budget), [category, audience, platform, budget]);
  const whatsappConsultUrl = whatsappUrl(siteConfig.whatsappPrimary);

  useEffect(() => {
    const lead = getSavedLead();
    if (lead) {
      setLeadForm(lead);
      setIsUnlocked(true);
    }
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(TOOL_SESSION_KEY);
      if (token) {
        setSessionToken(token);
        fetch(`${LOCAL_API_BASE}/auth/session?token=${token}`).then((r) => (r.ok ? r.json() : null)).then((payload) => {
          if (payload?.lead) {
            const nextLead = payload.lead as LeadForm;
            setLeadForm(nextLead);
            saveLead(nextLead);
            setIsUnlocked(true);
          }
        }).catch(() => undefined);
      }
    }
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (processedUrl) URL.revokeObjectURL(processedUrl);
    };
  }, []);

  const trackUsage = async (mode: string, meta: Record<string, unknown>) => {
    try {
      await fetch(`${LOCAL_API_BASE}/leads/utility-usage`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {}) }, body: JSON.stringify({ tool: 'utility-studio', mode, meta }) });
    } catch {}
  };

  const handleLeadChange = (field: keyof LeadForm) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setLeadForm((current) => ({ ...current, [field]: event.target.value }));
  const requestAccess = async () => {
    if (!leadForm.name || !leadForm.email || !leadForm.phone || !leadForm.businessType) return setLeadError('Please complete all fields to continue.');
    setAuthLoading(true); setLeadError(''); setAuthMessage('');
    try {
      const response = await fetch(`${LOCAL_API_BASE}/auth/request-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(leadForm) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message || 'Unable to send verification code.');
      setOtpRequested(true); setAuthMessage('Verification code sent to your email.');
      if (payload?.devOtp && typeof window !== 'undefined' && ['127.0.0.1', 'localhost'].includes(window.location.hostname)) setOtpValue(payload.devOtp);
    } catch (error) {
      setLeadError(error instanceof Error ? error.message : 'Unable to send verification code.');
    } finally { setAuthLoading(false); }
  };

  const verifyAccess = async () => {
    if (!leadForm.email || !otpValue) return setLeadError('Enter the verification code to continue.');
    setAuthLoading(true); setLeadError('');
    try {
      const response = await fetch(`${LOCAL_API_BASE}/auth/verify-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: leadForm.email, otp: otpValue }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message || 'Unable to verify code.');
      saveLead(leadForm); if (typeof window !== 'undefined') localStorage.setItem(TOOL_SESSION_KEY, payload.token); setSessionToken(payload.token); setIsUnlocked(true); setOtpRequested(false); setAuthMessage('Access unlocked successfully.');
    } catch (error) {
      setLeadError(error instanceof Error ? error.message : 'Unable to verify code.');
    } finally { setAuthLoading(false); }
  };

  const onFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl); if (processedUrl) URL.revokeObjectURL(processedUrl);
    setSelectedFile(file); setPreviewUrl(URL.createObjectURL(file)); setOriginalSize(file.size); setProcessedUrl(''); setProcessedSize(null); setProcessError(''); setDownloadName(file.name.replace(/\.[^/.]+$/, '') || 'click-commerce-hub-output');
  };

  const runImageProcess = async () => {
    if (!selectedFile) return setProcessError('Please upload an image first.');
    setProcessing(true); setProcessError('');
    try {
      const img = new Image();
      const sourceUrl = URL.createObjectURL(selectedFile);
      await new Promise<void>((resolve, reject) => { img.onload = () => resolve(); img.onerror = () => reject(new Error('Unable to read the image.')); img.src = sourceUrl; });
      const canvas = document.createElement('canvas');
      canvas.width = utilityMode === 'resize' ? Number(width) : img.width;
      canvas.height = utilityMode === 'resize' ? Number(height) : img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas is not supported in this browser.');
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
      ctx.fillStyle = outputFormat === 'image/jpeg' ? '#ffffff' : 'transparent';
      ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      if (utilityMode === 'background') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); const pixels = imageData.data; const limit = Number(threshold);
        for (let i = 0; i < pixels.length; i += 4) { const r = pixels[i]; const g = pixels[i + 1]; const b = pixels[i + 2]; const avg = (r + g + b) / 3; const spread = Math.max(r, g, b) - Math.min(r, g, b); if (avg >= limit && spread < 42) pixels[i + 3] = 0; }
        ctx.putImageData(imageData, 0, 0);
      }
      const type = utilityMode === 'background' ? 'image/png' : outputFormat;
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, Number(quality)));
      URL.revokeObjectURL(sourceUrl); if (!blob) throw new Error('Unable to create the processed file.');
      if (processedUrl) URL.revokeObjectURL(processedUrl); const nextUrl = URL.createObjectURL(blob);
      setProcessedUrl(nextUrl); setProcessedSize(blob.size); if (utilityMode === 'background') setOutputFormat('image/png');
      void trackUsage(utilityMode, utilityMode === 'resize' ? { width: canvas.width, height: canvas.height, outputFormat } : { threshold: Number(threshold) });
    } catch (error) {
      setProcessError(error instanceof Error ? error.message : 'Something went wrong while processing the image.');
    } finally { setProcessing(false); }
  };

  const resetUtility = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl); if (processedUrl) URL.revokeObjectURL(processedUrl);
    setSelectedFile(null); setPreviewUrl(''); setProcessedUrl(''); setOriginalSize(null); setProcessedSize(null); setProcessError(''); if (fileRef.current) fileRef.current.value = '';
  };

  const tabs: Array<{ key: ToolTab; label: string }> = [{ key: 'utility', label: 'Utility Studio' }, { key: 'recommender', label: 'Service Recommender' }, { key: 'audit', label: 'Listing Audit' }, { key: 'product', label: 'Product Suggestions' }];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.12),_transparent_38%),linear-gradient(180deg,#fff7f0_0%,#ffffff_36%,#fffaf6_100%)] text-gray-900">
      <Navbar />
      <main className="pt-28">
        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2.5rem] border border-orange-100 bg-white/90 shadow-[0_30px_120px_rgba(15,23,42,0.08)]">
            <div className="grid gap-10 px-6 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-14">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700"><Sparkles className="h-4 w-4" />Free utility suite + marketplace planning</div>
                <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">Utility-led experiences that build trust fast and move serious brands toward the right growth decision.</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">Give visitors practical image utilities, smart service guidance, listing feedback, and product direction in one polished workspace designed for conversion.</p>
                <div className="mt-8 flex flex-wrap gap-4"><button onClick={() => setTab('utility')} className="inline-flex items-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700">Open Utility Studio<ArrowRight className="ml-2 h-4 w-4" /></button><Link to="/contact-click-commerce-hub" className="inline-flex items-center rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-orange-200 hover:text-orange-700">Book Growth Consultation</Link></div>
              </div>
              <div className="rounded-[2rem] border border-gray-200 bg-gray-950 p-8 text-white">
                <h2 className="text-xl font-bold">What visitors can do</h2>
                <div className="mt-6 space-y-4 text-sm leading-6 text-gray-300"><p>Resize, convert, and prepare marketplace-ready product images.</p><p>Remove backgrounds for cleaner catalog assets and creatives.</p><p>Get service direction, listing feedback, and product-launch ideas.</p></div>
                <a href={whatsappConsultUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-orange-50">WhatsApp the team</a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">{tabs.map((item) => <button key={item.key} onClick={() => setTab(item.key)} className={`inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold transition ${tab === item.key ? 'bg-gray-950 text-white' : 'border border-gray-200 bg-white text-gray-700 hover:border-orange-200 hover:text-orange-700'}`}>{item.label}</button>)}</div>

          {tab === 'utility' && <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"><div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-2xl font-extrabold text-gray-950">Utility Studio</h2><p className="mt-2 text-base leading-7 text-gray-600">Resize, convert, and clean up product images in one workspace.</p></div><div className="inline-flex rounded-full border border-gray-200 bg-gray-50 p-1"><button onClick={() => setUtilityMode('resize')} className={`rounded-full px-4 py-2 text-sm font-semibold ${utilityMode === 'resize' ? 'bg-white text-orange-700 shadow-sm' : 'text-gray-600'}`}>Resize + Convert</button><button onClick={() => setUtilityMode('background')} className={`rounded-full px-4 py-2 text-sm font-semibold ${utilityMode === 'background' ? 'bg-white text-orange-700 shadow-sm' : 'text-gray-600'}`}>Background Remover</button></div></div>
          {!isUnlocked ? <div className="mt-8 rounded-[1.75rem] border border-orange-100 bg-orange-50/70 p-6"><div className="flex items-center gap-3 text-lg font-bold text-gray-950"><LockKeyhole className="h-5 w-5 text-orange-600" />Access Utility Studio</div><p className="mt-3 text-sm leading-6 text-gray-600">Share your details to access a professional image workspace built for marketplace-ready outputs and faster execution.</p><div className="mt-6 grid gap-4 md:grid-cols-2"><div><label className="text-sm font-medium text-gray-700">Name</label><input value={leadForm.name} onChange={handleLeadChange('name')} className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100" /></div><div><label className="text-sm font-medium text-gray-700">Business email</label><input value={leadForm.email} onChange={handleLeadChange('email')} type="email" className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100" /></div><div><label className="text-sm font-medium text-gray-700">Phone</label><input value={leadForm.phone} onChange={handleLeadChange('phone')} className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100" /></div><div><label className="text-sm font-medium text-gray-700">Business type</label><select value={leadForm.businessType} onChange={handleLeadChange('businessType')} className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"><option value="">Select one</option><option value="Brand owner">Brand owner</option><option value="Marketplace seller">Marketplace seller</option><option value="Distributor">Distributor</option><option value="Agency / consultant">Agency / consultant</option></select></div></div>{otpRequested && <div className="mt-4"><label className="text-sm font-medium text-gray-700">Verification code</label><input value={otpValue} onChange={(e) => setOtpValue(e.target.value)} className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100" /></div>}{leadError && <p className="mt-4 text-sm font-medium text-red-600">{leadError}</p>}{authMessage && <p className="mt-4 text-sm font-medium text-green-700">{authMessage}</p>}<div className="mt-6 flex flex-wrap gap-3">{!otpRequested ? <button onClick={requestAccess} disabled={authLoading} className="rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60">{authLoading ? 'Continuing...' : 'Continue to Tools'}</button> : <button onClick={verifyAccess} disabled={authLoading} className="rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:opacity-60">{authLoading ? 'Verifying...' : 'Verify and Unlock'}</button>}</div></div> : <div className="mt-8 space-y-6"><div className="grid gap-4 md:grid-cols-3"><button onClick={() => { setWidth('2000'); setHeight('2000'); }} className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-orange-200 hover:text-orange-700">Amazon square</button><button onClick={() => { setWidth('2000'); setHeight('2000'); }} className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-orange-200 hover:text-orange-700">Flipkart square</button><button onClick={() => { setWidth('1080'); setHeight('1080'); }} className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-orange-200 hover:text-orange-700">Instagram post</button></div><div className="rounded-[1.75rem] border border-dashed border-gray-300 bg-gray-50 p-6 text-center"><input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" /><button onClick={() => fileRef.current?.click()} className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200"><Upload className="h-6 w-6 text-orange-600" /></button><p className="mt-4 text-base font-semibold text-gray-900">Upload a product image</p><p className="mt-2 text-sm leading-6 text-gray-600">PNG, JPG, and WebP inputs supported.</p></div>{utilityMode === 'resize' ? <div className="grid gap-4 md:grid-cols-3"><div><label className="text-sm font-medium text-gray-700">Width</label><input value={width} onChange={(e) => setWidth(e.target.value)} className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100" /></div><div><label className="text-sm font-medium text-gray-700">Height</label><input value={height} onChange={(e) => setHeight(e.target.value)} className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100" /></div><div><label className="text-sm font-medium text-gray-700">Format</label><select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value as 'image/png' | 'image/jpeg' | 'image/webp')} className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"><option value="image/png">PNG</option><option value="image/jpeg">JPG</option><option value="image/webp">WebP</option></select></div><div className="md:col-span-3"><label className="text-sm font-medium text-gray-700">Quality</label><input type="range" min="0.4" max="1" step="0.01" value={quality} onChange={(e) => setQuality(e.target.value)} className="mt-3 w-full accent-orange-600" /></div></div> : <div><label className="text-sm font-medium text-gray-700">Background sensitivity</label><input type="range" min="180" max="250" step="1" value={threshold} onChange={(e) => setThreshold(e.target.value)} className="mt-3 w-full accent-orange-600" /></div>}{processError && <p className="text-sm font-medium text-red-600">{processError}</p>}<div className="flex flex-wrap gap-3"><button onClick={runImageProcess} disabled={processing || !selectedFile} className="rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:opacity-50">{processing ? 'Processing...' : utilityMode === 'resize' ? 'Process Image' : 'Remove Background'}</button><button onClick={resetUtility} className="rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-orange-200 hover:text-orange-700">Reset</button></div></div>}</div><div className="space-y-6"><div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm"><div className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">Preview</div><div className="mt-6 grid gap-5 sm:grid-cols-2"><div className="rounded-[1.5rem] border border-gray-200 bg-gray-50 p-4"><p className="text-sm font-semibold text-gray-500">Original</p><div className="mt-4 flex min-h-52 items-center justify-center overflow-hidden rounded-[1.25rem] bg-white">{previewUrl ? <img src={previewUrl} alt="Original upload" className="max-h-56 w-full object-contain" /> : <ImageIcon className="h-10 w-10 text-gray-300" />}</div><p className="mt-4 text-sm text-gray-500">{originalSize ? `${(originalSize / 1024).toFixed(1)} KB` : 'Waiting for upload'}</p></div><div className="rounded-[1.5rem] border border-gray-200 bg-gray-50 p-4"><p className="text-sm font-semibold text-gray-500">Processed</p><div className="mt-4 flex min-h-52 items-center justify-center overflow-hidden rounded-[1.25rem] bg-white">{processedUrl ? <img src={processedUrl} alt="Processed output" className="max-h-56 w-full object-contain" /> : <Wand2 className="h-10 w-10 text-gray-300" />}</div><p className="mt-4 text-sm text-gray-500">{processedSize ? `${(processedSize / 1024).toFixed(1)} KB` : 'Ready after processing'}</p></div></div>{processedUrl && <a href={processedUrl} download={`${downloadName}.${outputFormat === 'image/jpeg' ? 'jpg' : outputFormat === 'image/webp' ? 'webp' : 'png'}`} className="mt-6 inline-flex items-center rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800">Download output</a>}</div><div className="rounded-[2rem] border border-gray-200 bg-gray-950 p-8 text-white"><h3 className="text-xl font-bold">Built for marketplace teams</h3><p className="mt-4 text-sm leading-6 text-gray-300">Use the utility suite to produce cleaner assets, accelerate decision-making, and set a stronger standard before execution begins.</p><div className="mt-6 flex flex-wrap gap-3"><Link to="/amazon-cataloging-service" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-950">Amazon Cataloging</Link><Link to="/marketplace-ppc-management" className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white">PPC Growth</Link></div></div></div></div>}

          {tab === 'recommender' && <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]"><div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm"><h2 className="text-2xl font-extrabold text-gray-900">AI Service Recommender</h2><p className="mt-3 text-base leading-7 text-gray-600">Get a clear recommendation backed by platform priorities, growth stage, and the operational gaps holding performance back.</p><div className="mt-8 grid gap-6 md:grid-cols-2"><div><label className="block text-sm font-medium text-gray-700">Primary platform</label><select value={platform} onChange={(e) => setPlatform(e.target.value as PlatformOption)} className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100">{platforms.map((item) => <option key={item}>{item}</option>)}</select></div><div><label className="block text-sm font-medium text-gray-700">Main goal</label><select value={goal} onChange={(e) => setGoal(e.target.value as GoalOption)} className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100">{goals.map((item) => <option key={item}>{item}</option>)}</select></div><div><label className="block text-sm font-medium text-gray-700">Growth stage</label><select value={stage} onChange={(e) => setStage(e.target.value as StageOption)} className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100">{stages.map((item) => <option key={item}>{item}</option>)}</select></div><div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Current issues</label><textarea value={issues} onChange={(e) => setIssues(e.target.value)} rows={5} className="mt-2 w-full rounded-[1.5rem] border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100" /></div></div></div><div className="rounded-[2rem] border border-gray-200 bg-gray-50 p-8 shadow-sm"><div className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">Recommended path</div><h3 className="mt-6 text-3xl font-extrabold text-gray-900">{recommendation.title}</h3><p className="mt-4 text-base leading-7 text-gray-600">{recommendation.summary}</p><div className="mt-6 space-y-3">{recommendation.points.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-gray-200 bg-white p-4"><CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" /><p className="text-sm leading-6 text-gray-700">{item}</p></div>)}</div><div className="mt-8 flex flex-wrap gap-3"><Link to={recommendation.href} className="rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700">{recommendation.label}</Link><a href={whatsappConsultUrl} target="_blank" rel="noreferrer" className="rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-orange-200 hover:text-orange-700">Talk on WhatsApp</a></div></div></div>}

          {tab === 'audit' && <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]"><div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm"><h2 className="text-2xl font-extrabold text-gray-900">Listing Audit Lite</h2><p className="mt-3 text-base leading-7 text-gray-600">Review your listing structure, strengthen buyer messaging, and uncover the fixes that improve visibility and conversion.</p><div className="mt-8 space-y-6"><div><label className="block text-sm font-medium text-gray-700">Product title</label><input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100" /></div><div><label className="block text-sm font-medium text-gray-700">Bullet points</label><textarea value={bullets} onChange={(e) => setBullets(e.target.value)} rows={6} className="mt-2 w-full rounded-[1.5rem] border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100" /></div><div><label className="block text-sm font-medium text-gray-700">Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={7} className="mt-2 w-full rounded-[1.5rem] border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100" /></div></div><div className="mt-6 flex flex-wrap gap-4"><button onClick={() => setShowAudit(true)} className="rounded-full bg-orange-600 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-700">Run Audit</button><button onClick={() => { setTitle(''); setBullets(''); setDescription(''); setShowAudit(false); }} className="rounded-full border border-gray-200 px-7 py-3 text-sm font-semibold text-gray-600 transition-all hover:border-orange-200 hover:text-orange-600">Reset</button></div></div><div className="rounded-[2rem] border border-gray-200 bg-gray-50 p-8 shadow-sm">{showAudit ? <><div className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">Audit snapshot</div><div className="mt-6"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Strengths</p><div className="mt-4 space-y-3">{audit.strengths.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"><CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" /><p className="text-sm leading-6 text-gray-700">{item}</p></div>)}</div></div><div className="mt-6"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Risks</p><div className="mt-4 space-y-3">{audit.risks.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"><AlertTriangle className="mt-0.5 h-5 w-5 text-orange-600" /><p className="text-sm leading-6 text-gray-700">{item}</p></div>)}</div></div><div className="mt-6"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Recommendations</p><div className="mt-4 space-y-3">{audit.suggestions.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"><Sparkles className="mt-0.5 h-5 w-5 text-orange-600" /><p className="text-sm leading-6 text-gray-700">{item}</p></div>)}</div></div></> : <div className="flex h-full flex-col items-start justify-center"><div className="inline-flex rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"><Search className="h-7 w-7 text-orange-600" /></div><h3 className="mt-6 text-2xl font-extrabold text-gray-900">Check if your listing is built to convert</h3><p className="mt-4 text-base leading-7 text-gray-600">See where your listing is losing ranking strength or buyer confidence, then act on the improvements that matter most.</p></div>}</div></div>}

          {tab === 'product' && <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.95fr]"><div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm"><h2 className="text-2xl font-extrabold text-gray-900">Product Suggestion Engine</h2><p className="mt-3 text-base leading-7 text-gray-600">Discover product directions with stronger commercial logic, sharper positioning, and better marketplace fit.</p><div className="mt-8 grid gap-6 md:grid-cols-2"><div><label className="block text-sm font-medium text-gray-700">Category</label><select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100">{categories.map((item) => <option key={item}>{item}</option>)}</select></div><div><label className="block text-sm font-medium text-gray-700">Audience</label><select value={audience} onChange={(e) => setAudience(e.target.value)} className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100">{audiences.map((item) => <option key={item}>{item}</option>)}</select></div><div><label className="block text-sm font-medium text-gray-700">Preferred platform</label><select value={platform} onChange={(e) => setPlatform(e.target.value as PlatformOption)} className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100">{platforms.map((item) => <option key={item}>{item}</option>)}</select></div><div><label className="block text-sm font-medium text-gray-700">Launch budget</label><input value={budget} onChange={(e) => setBudget(e.target.value)} className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100" /></div></div><div className="mt-6 flex flex-wrap gap-4"><button onClick={() => setShowProducts(true)} className="rounded-full bg-orange-600 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-700">Generate Product Ideas</button><button onClick={() => { setCategory(categories[0]); setAudience(audiences[0]); setBudget('50000'); setShowProducts(false); }} className="rounded-full border border-gray-200 px-7 py-3 text-sm font-semibold text-gray-600 transition-all hover:border-orange-200 hover:text-orange-600">Reset</button></div></div><div className="rounded-[2rem] border border-gray-200 bg-gray-50 p-8 shadow-sm">{showProducts ? <><div className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">Suggested products</div><div className="mt-6 space-y-4">{productIdeas.map((idea) => <div key={idea.name} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"><h3 className="text-xl font-bold text-gray-900">{idea.name}</h3><p className="mt-3 text-sm leading-6 text-gray-600">{idea.why}</p><div className="mt-4 space-y-2 text-sm text-gray-700"><p><span className="font-semibold text-gray-900">Best channel:</span> {idea.channel}</p><p><span className="font-semibold text-gray-900">Launch angle:</span> {idea.angle}</p></div></div>)}</div><div className="mt-8 rounded-3xl bg-gray-900 p-6 text-white"><h3 className="text-xl font-bold">Need a go-to-market plan for one of these?</h3><p className="mt-3 text-sm leading-6 text-gray-300">We can convert product ideas into marketplace launch plans, listing strategy, and execution support.</p><div className="mt-5 flex flex-wrap gap-3"><Link to="/ecommerce-business-consulting" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900">Consulting Service</Link><a href={whatsappConsultUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white">Discuss on WhatsApp</a></div></div></> : <div className="flex h-full flex-col items-start justify-center"><div className="inline-flex rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"><Lightbulb className="h-7 w-7 text-orange-600" /></div><h3 className="mt-6 text-2xl font-extrabold text-gray-900">See product opportunities with clearer demand signals and stronger launch potential</h3><p className="mt-4 text-base leading-7 text-gray-600">Use these suggestions to identify stronger launch angles, shortlist higher-potential ideas, and move forward with more confidence.</p></div>}</div></div>}
        </section>
      </main>
      <Footer />
    </div>
  );
}

