export default function Page({ params }: { params: { id: string } }) {
  return <h1>My feedback system: {params.id}</h1>
}
  