import { useParams, Navigate } from 'react-router-dom';
import { platforms, allServicePages, locations, blogs } from '../data';
import PlatformPage from './PlatformPage';
import ServicePage from './ServicePage';
import LocationPage from './LocationPage';
import BlogPost from './BlogPost';

export default function DynamicRouter() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/" />;

  // Check if it's a platform page
  const platform = platforms.find((p) => p.slug === slug);
  if (platform) {
    return <PlatformPage platform={platform} />;
  }

  // Check if it's a service page
  const service = allServicePages.find((s) => s.slug === slug);
  if (service) {
    const parentPlatform = platforms.find(p => p.id === service.platformId);
    return <ServicePage service={service} platform={parentPlatform} />;
  }

  // Check if it's a blog page
  const blog = blogs.find((b) => b.slug === slug);
  if (blog) {
    return <BlogPost blog={blog} />;
  }

  // Check if it's a location page (e.g., amazon-cataloging-service-delhi)
  // We need to find the longest matching service slug
  let matchedService = null;
  let matchedLocation = null;

  for (const s of allServicePages) {
    if (slug.startsWith(s.slug + '-')) {
      const potentialLocation = slug.replace(s.slug + '-', '');
      if (locations.includes(potentialLocation)) {
        matchedService = s;
        matchedLocation = potentialLocation;
        break;
      }
    }
  }

  if (matchedService && matchedLocation) {
    const parentPlatform = platforms.find(p => p.id === matchedService.platformId);
    return <LocationPage service={matchedService} platform={parentPlatform} location={matchedLocation} />;
  }

  // If no match, redirect to home or 404
  return <Navigate to="/" />;
}
