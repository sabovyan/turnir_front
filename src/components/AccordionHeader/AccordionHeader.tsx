import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styles from './AccordionHeader.module.css';

interface IAccordionHeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  description?: string;
  header: string;
}

const AccordionHeader = ({ header, description }: IAccordionHeaderProps) => {
  const [extended, setExtended] = useState<boolean>(false);

  return (
    <div className={extended ? styles.accordionExtended : styles.accordion}>
      <div
        className={styles.accordionHeadBar}
        onClick={() => {
          if (description) {
            setExtended((state) => !state);
          }
        }}
      >
        <div className={styles.accordionHeader}>{header}</div>

        <div
          className={
            extended ? styles.accordionIconExpanded : styles.accordionIcon
          }
        >
          {description && <ExpandMoreIcon />}
        </div>
      </div>
      <div className={styles.accordionDescription}>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default AccordionHeader;
