/**
 * KOREB — Natural Cosmetics
 * src/components/ProductStory/ProductFrame.jsx
 * Tall arched product frame displaying the 5 product photographs.
 * Automatically triggers Canvas retouching for Photo #2 and Photo #4.
 */

import React, { useEffect } from 'react';
import { retouchFaceCreamPhoto, retouchFaceOilPhoto } from '../../utils/retouch';

export default function ProductFrame({ chapters, slideRefs }) {
  useEffect(() => {
    const prodImg1 = document.getElementById('prodImg1');
    const prodImg3 = document.getElementById('prodImg3');

    if (prodImg1 && chapters[1]?.productImage?.retouchType === 'cream') {
      retouchFaceCreamPhoto(prodImg1);
    }
    if (prodImg3 && chapters[3]?.productImage?.retouchType === 'oil') {
      retouchFaceOilPhoto(prodImg3);
    }
  }, [chapters]);

  return (
    <div className="product-frame-shell">
      <div className="product-frame">
        {chapters.map((ch, idx) => {
          const isFirst = idx === 0;
          return (
            <div
              key={ch.id}
              ref={(el) => (slideRefs.current[idx] = el)}
              className="product-slide"
              data-chapter={idx}
              style={isFirst ? { opacity: 1 } : undefined}
            >
              <img
                id={ch.productImage.id}
                src={ch.productImage.src}
                alt={ch.productImage.alt}
                loading={ch.productImage.loading}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
