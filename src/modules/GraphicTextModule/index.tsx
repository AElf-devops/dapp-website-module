import clsx from 'clsx';
import HomeTwoColumnsCard from '@/components/HomeTwoColumnsCard';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';
import { INITIAL, variantDownToUp, VIEWPORT, WHILE_IN_VIEW } from '@/constants/motion';
import { GraphicTextModuleType, IGraphicTextModule } from '@/types/modules/graphicTextModule';
import { s3Url } from '@/constants/network';
import useGetVertical from '@/hooks/useGetVertical';
import TopPicture from '../TopPicture';

export interface GraphicTextModuleProps {
  module: IGraphicTextModule;
}

const DEFAULT_PADDING_VERTICAL = 120;

export default function GraphicTextModule({ module }: GraphicTextModuleProps) {
  const { getVertical } = useGetVertical();
  const { defaultBackgroundColor } = module.commonStyles;
  if (module.type === GraphicTextModuleType.TopPicture_BottomText) {
    return <TopPicture module={module} />;
  }

  return (
    <motion.div initial={INITIAL} whileInView={WHILE_IN_VIEW} viewport={VIEWPORT}>
      <section
        className={clsx(['section-container', 'flex-column-center', styles.graphicTextModule])}
        style={{
          backgroundColor: defaultBackgroundColor,
          paddingTop: getVertical(module.commonStyles).top + 'px',
          paddingBottom: getVertical(module.commonStyles).bottom + 'px',
        }}>
        {module.title?.text && (
          <motion.div variants={variantDownToUp(0)}>
            <div className={clsx(['page-container', styles.sectionTitle, styles.graphicTextModuleTitle])}>
              {module.title.text}
            </div>
          </motion.div>
        )}

        <HomeTwoColumnsCard
          className={styles.graphicTextModuleItem}
          imgSrc={module.image?.filename_disk ? s3Url + module.image?.filename_disk : ''}
          imgPosition={module.type}
          title={module.subTitle?.text}
          contents={module.descriptionList || []}
          imageClassName={styles.image}
          buttonList={module.buttonList}
        />
      </section>
    </motion.div>
  );
}
