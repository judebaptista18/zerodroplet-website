import {notFound} from 'next/navigation';
import {ServiceDetails} from '@/components/ServiceDetails';
import {getService, getServices} from '@/sanity/lib/services';

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({slug: service.slug}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const service = await getService(slug);
  return {
    title: service?.seoTitle || service?.title || 'Service',
    description: service?.seoDescription || service?.summary,
  };
}

export default async function ServicePage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const service = await getService(slug);
  if (!service) notFound();
  return <ServiceDetails service={service} />;
}
