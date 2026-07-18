import ServiceDetailPage from '../../../views/ServiceDetailPage';
import { serviceDetailsData } from '../../../data/serviceDetails';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return serviceDetailsData.map((service) => ({
    slug: service.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  
  const service = serviceDetailsData.find((s) => s.slug === slug);
  
  if (!service) {
    notFound();
  }

  return <ServiceDetailPage service={service} />;
}
