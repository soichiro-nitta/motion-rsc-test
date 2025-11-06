import Image from 'next/image'
import _MotionDemo from '@/app/_Client/_MotionDemo'
import { ID } from '@/app/id'

const Page = () => {
  const cards = [
    { id: 'motion', title: 'motion.to', body: 'transformとopacityのみを高速に制御します。' },
    { id: 'delay', title: 'motion.delay', body: 'setTimeoutではなくPromiseベースで待機します。' },
  ]
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-16 text-zinc-900">
      <section className="flex w-full max-w-3xl flex-col gap-10 rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-zinc-500">@soichiro_nitta/motion</p>
          <h1 id={ID.TITLE.N} className="text-3xl font-semibold opacity-0" style={{ transform: 'translateY(24px)' }}>
            RSC と Client Component を分離したまま DOM アニメーションを実行できます。
          </h1>
        </div>
        <div id={ID.BOX.N} className="grid grid-cols-1 gap-4 opacity-0 sm:grid-cols-2" style={{ transform: 'translateY(24px)' }}>
          {cards.map((card) => {
            return (
              <article key={card.id} className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
                <h2 className="text-xl font-semibold">{card.title}</h2>
                <p className="mt-2 text-sm text-zinc-500">{card.body}</p>
              </article>
            )
          })}
        </div>
        <div className="flex items-center gap-4 text-sm text-zinc-500">
          <Image src="/next.svg" alt="Next.js logo" width={80} height={16} priority />
          <span>Next.js 16 + React 19 で検証</span>
        </div>
      </section>
      <_MotionDemo />
    </div>
  )
}

export default Page
