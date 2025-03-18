export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Pavel: {params.slug}</div>;
}
