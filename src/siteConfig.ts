export const siteConfig = {
  email: 'hello@clickcommercehub.dpdns.org',
  whatsappPrimary: '+916200017130',
  whatsappSecondary: '+918252265832',
  whatsappMessage: 'Hi, I want to grow my ecommerce business with Click Commerce Hub.',
  socialLinks: {
    youtube: 'https://www.youtube.com/@ClickCommerceHub',
    instagram: 'https://www.instagram.com/clickcommercehub_/',
    indiamart: 'https://www.indiamart.com/click-commerce-hub/',
    linkedin: 'https://in.linkedin.com/in/shivam-raj-66b658377',
    facebook: 'https://www.facebook.com/profile.php?id=61582980849948',
  },
};

export const whatsappUrl = (phone: string) =>
  `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;
