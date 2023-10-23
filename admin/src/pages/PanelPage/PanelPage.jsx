import { motion } from 'framer-motion'

import './PanelPage.scss'


export default function PanelPage() {
  return (
    <motion.div 
        className="dashboard"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
    >
        <div className="panel__inner">
            <div className="panel__inner__item item-1">
                item 1
            </div>

            <div className="panel__inner__item item-2">
                item 2
            </div>

            <div className="panel__inner__item item-3">
                <div className="item">
                    inner 1
                </div>
                <div className="item">
                    inner 2
                </div>
            </div>

            <div className="panel__inner__item item-4">
                item 4
            </div>
        </div>
    </motion.div>
  )
}
