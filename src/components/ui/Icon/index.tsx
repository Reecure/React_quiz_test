import { FC, SVGProps, VFC } from 'react';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

interface Props extends SvgProps {
  Svg: VFC<SVGProps<SVGSVGElement>> | string;
  className?: string;
}

const Icon: FC<Props> = (props) => {
  // eslint-disable-next-line no-empty-pattern
  const { Svg, width = 24, height = 24, className, ...otherProps } = props;

  const icon = (
    <Svg
      width={width}
      height={height}
      className={`${className} stroke-white`}
      {...otherProps}
    />
  );

  return icon;
};

export default Icon;
