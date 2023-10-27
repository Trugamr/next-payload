import { getPayload } from '@/payload/client'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function GenerationPage({ params }: { params: { id: string } }) {
  const payload = await getPayload()
  const generation = await payload.findByID({ collection: 'generations', id: params.id })

  if (!generation) {
    throw notFound()
  }

  return (
    <main className="flex min-h-screen flex-col items-start gap-2 p-6">
      <Link href="/generations" className="text-sm hover:underline">
        Back
      </Link>
      <hr />
      <h3>{generation.title}</h3>
      <p className="text-slate-500">{generation.prompt}</p>
      {typeof generation.image === 'object' ? (
        <Image
          className="bg-pink-100"
          src={generation.image.url!}
          alt={generation.image.alt}
          width={448}
          height={576}
        />
      ) : null}
    </main>
  )
}
