export const ecommercePlatforms = [
  { id: 'amazon', name: 'Amazon', slug: 'amazon-seller-services' },
  { id: 'flipkart', name: 'Flipkart', slug: 'flipkart-seller-services' },
  { id: 'meesho', name: 'Meesho', slug: 'meesho-seller-services' },
  { id: 'myntra', name: 'Myntra', slug: 'myntra-seller-services' },
  { id: 'snapdeal', name: 'Snapdeal', slug: 'snapdeal-seller-services' },
  { id: 'ajio', name: 'Ajio', slug: 'ajio-seller-services' },
  { id: 'jiomart', name: 'JioMart', slug: 'jiomart-seller-services' },
  { id: 'tata-cliq', name: 'Tata Cliq', slug: 'tata-cliq-seller-services' },
  { id: 'nykaa', name: 'Nykaa', slug: 'nykaa-seller-services' },
  { id: 'etsy-ebay', name: 'Etsy & eBay', slug: 'etsy-ebay-seller-services' },
];

export const quickCommercePlatforms = [
  { id: 'blinkit', name: 'Blinkit', slug: 'blinkit-seller-onboarding' },
  { id: 'zepto', name: 'Zepto', slug: 'zepto-seller-onboarding' },
  { id: 'instamart', name: 'Swiggy Instamart', slug: 'instamart-seller-onboarding' },
  { id: 'flipkart-minutes', name: 'Flipkart Minutes', slug: 'flipkart-minutes-seller-onboarding' },
];

export const otherPlatforms = [
  { id: 'marketing', name: 'Digital Marketing', slug: 'digital-marketing-services' },
  { id: 'business', name: 'Business & Compliance', slug: 'business-compliance-services' },
];

export const platforms = [...ecommercePlatforms, ...quickCommercePlatforms, ...otherPlatforms];

export const allServicePages = [
  // Amazon Services
  { platformId: 'amazon', name: 'Cataloging Service', slug: 'amazon-cataloging-service' },
  { platformId: 'amazon', name: 'Listing Optimization', slug: 'amazon-listing-optimization-service' },
  { platformId: 'amazon', name: 'Product Listing', slug: 'amazon-product-listing-service' },
  { platformId: 'amazon', name: 'Account Management', slug: 'amazon-account-management-service' },
  { platformId: 'amazon', name: 'Advertising Optimization', slug: 'amazon-advertising-optimization-service' },
  { platformId: 'amazon', name: 'PPC Management', slug: 'amazon-ppc-management-service' },
  { platformId: 'amazon', name: 'A+ Content', slug: 'amazon-a-plus-content-service' },
  { platformId: 'amazon', name: 'Brand Store Design', slug: 'amazon-brand-store-design-service' },
  { platformId: 'amazon', name: 'Product Imaging', slug: 'amazon-product-imaging-service' },
  { platformId: 'amazon', name: 'Account Reinstatement', slug: 'amazon-account-reinstatement-service' },
  { platformId: 'amazon', name: 'Suspension Appeal', slug: 'amazon-suspension-appeal-service' },
  { platformId: 'amazon', name: 'FBA Prep & Packaging', slug: 'amazon-fba-prep-packaging-service' },
  { platformId: 'amazon', name: 'Inventory Management', slug: 'amazon-inventory-management-service' },
  { platformId: 'amazon', name: 'Storage Service', slug: 'amazon-storage-service' },
  { platformId: 'amazon', name: 'International Shipping', slug: 'amazon-international-shipping-service' },
  { platformId: 'amazon', name: 'International Returns', slug: 'amazon-international-returns-service' },
  { platformId: 'amazon', name: 'Domestic Shipping', slug: 'amazon-domestic-shipping-service' },
  { platformId: 'amazon', name: 'IP Accelerator Support', slug: 'amazon-ip-accelerator-support' },
  { platformId: 'amazon', name: 'Accounting Service', slug: 'amazon-accounting-service' },
  { platformId: 'amazon', name: 'Tax Support', slug: 'amazon-tax-support-service' },
  { platformId: 'amazon', name: 'Seller Training', slug: 'amazon-seller-training-service' },
  { platformId: 'amazon', name: 'Seller Lending Support', slug: 'amazon-seller-lending-support' },
  { platformId: 'amazon', name: 'Compliance Service', slug: 'amazon-compliance-service' },
  
  // Flipkart Services
  { platformId: 'flipkart', name: 'Cataloging Service', slug: 'flipkart-cataloging-service' },
  { platformId: 'flipkart', name: 'Product Listing', slug: 'flipkart-product-listing-service' },
  { platformId: 'flipkart', name: 'Account Management', slug: 'flipkart-account-management-service' },
  { platformId: 'flipkart', name: 'Advertising Service', slug: 'flipkart-advertising-service' },
  { platformId: 'flipkart', name: 'FBF Onboarding', slug: 'flipkart-fbf-onboarding-service' },
  { platformId: 'flipkart', name: 'Account Reinstatement', slug: 'flipkart-account-reinstatement-service' },
  { platformId: 'flipkart', name: 'Product Imaging', slug: 'flipkart-product-imaging-service' },
  { platformId: 'flipkart', name: 'Inventory Management', slug: 'flipkart-inventory-management-service' },
  { platformId: 'flipkart', name: 'Compliance Service', slug: 'flipkart-compliance-service' },
  { platformId: 'flipkart', name: 'Liquidation Service', slug: 'flipkart-liquidation-service' },

  // Meesho Services
  { platformId: 'meesho', name: 'Cataloging Service', slug: 'meesho-cataloging-service' },
  { platformId: 'meesho', name: 'Product Listing', slug: 'meesho-product-listing-service' },
  { platformId: 'meesho', name: 'Account Management', slug: 'meesho-account-management-service' },
  { platformId: 'meesho', name: 'Advertising Service', slug: 'meesho-advertising-service' },
  { platformId: 'meesho', name: 'Logistics Support', slug: 'meesho-logistics-support-service' },

  // Digital Marketing Services
  { platformId: 'marketing', name: 'SEO Services for Ecommerce', slug: 'seo-services-for-ecommerce' },
  { platformId: 'marketing', name: 'Amazon SEO Services', slug: 'amazon-seo-services' },
  { platformId: 'marketing', name: 'Marketplace PPC Management', slug: 'marketplace-ppc-management' },
  { platformId: 'marketing', name: 'Social Media Marketing', slug: 'social-media-marketing-for-ecommerce' },
  { platformId: 'marketing', name: 'Email Marketing', slug: 'email-marketing-for-ecommerce' },
  { platformId: 'marketing', name: 'Content Marketing', slug: 'content-marketing-for-ecommerce' },

  // Business & Compliance Services
  { platformId: 'business', name: 'GST Registration', slug: 'gst-registration-for-ecommerce-sellers' },
  { platformId: 'business', name: 'GST Compliance', slug: 'gst-compliance-for-sellers' },
  { platformId: 'business', name: 'PPOB/APOB Registration', slug: 'ppob-apob-registration-service' },
  { platformId: 'business', name: 'Ecommerce Consulting', slug: 'ecommerce-business-consulting' },
];

export const locations = [
  'india', 'delhi', 'mumbai', 'bangalore', 'hyderabad', 'pune', 'chennai', 'kolkata', 'ahmedabad', 'noida', 'gurgaon', 'jaipur', 'lucknow', 'patna', 'surat'
];

export const blogs = [
  { title: 'How to Start Selling on Amazon India', slug: 'how-to-start-selling-on-amazon-india' },
  { title: 'Amazon Seller Registration Guide', slug: 'amazon-seller-registration-guide' },
  { title: 'How to Create Amazon Product Listing', slug: 'how-to-create-amazon-product-listing' },
  { title: 'Amazon Advertising Beginners Guide', slug: 'amazon-advertising-beginners-guide' },
  { title: 'How to Rank Products on Amazon', slug: 'how-to-rank-products-on-amazon' },
  { title: 'How to Increase Amazon Sales', slug: 'how-to-increase-amazon-sales' },
  { title: 'Flipkart Seller Onboarding Guide', slug: 'flipkart-seller-onboarding-guide' },
  { title: 'Meesho Seller Registration Guide', slug: 'meesho-seller-registration-guide' },
  { title: 'Quick Commerce Business Model', slug: 'quick-commerce-business-model' },
  { title: 'How to Scale Ecommerce Business', slug: 'how-to-scale-ecommerce-business' },
  { title: 'Amazon FBA vs FBM Guide', slug: 'amazon-fba-vs-fbm-guide' },
  { title: 'Amazon SEO Strategy Guide', slug: 'amazon-seo-strategy-guide' },
  { title: 'Ecommerce Inventory Management Guide', slug: 'ecommerce-inventory-management-guide' },
];


