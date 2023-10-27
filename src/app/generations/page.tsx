import { getPayload } from '@/payload/client'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function GenerationsPage() {
  const payload = await getPayload()
  const generations = await payload.find({
    collection: 'generations',
    pagination: false,
  })

  return (
    <main className="p-6">
      {generations.docs.length ? (
        <ul>
          {generations.docs.map(item => (
            <li key={item.id}>
              <Link href={`/generations/${item.id}`} className="hover:underline">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          Try adding a generation in the{' '}
          <Link
            href="/admin/collections/generations"
            className="text-pink-400 underline"
            target="_blank"
          >
            admin
          </Link>
          !
        </p>
      )}
    </main>
  )
}
