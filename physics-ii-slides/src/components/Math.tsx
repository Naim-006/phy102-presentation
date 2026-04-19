import React from 'react';
import katex from 'katex';

interface LatexProps {
  formula: string;
  block?: boolean;
}

export const Latex = ({ formula, block = false }: LatexProps) => {
  const containerRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      katex.render(formula, containerRef.current, {
        throwOnError: false,
        displayMode: block,
      });
    }
  }, [formula, block]);

  return <span ref={containerRef} />;
};
