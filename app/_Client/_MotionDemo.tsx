'use client'

import { useEffectAsync } from '@soichiro_nitta/motion'
import { motion } from '@/app/motion'

const MotionDemo = () => {
  useEffectAsync(async () => {
    await motion.delay(0.1)
    await motion.to('BOX', 0.6, 'out', {
      opacity: '1',
      translateY: '0px',
    })
    await motion.to('TITLE', 0.6, 'out', {
      opacity: '1',
      translateY: '0px',
    })
  }, [])

  return null
}

export default MotionDemo
