import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { TireTypeEnum } from '@/enums/TireType.enum';
import { asset } from '@/utils/asset';

const tires = [
  TireTypeEnum.SOFT,
  TireTypeEnum.MEDIUM,
  TireTypeEnum.HARD,
  TireTypeEnum.INTERMEDIATE,
  TireTypeEnum.WET,
];

const TOTAL_ICONS = 7;
const ICON_SIZE = 55;
const VISIBLE_TIRES = 5;

interface Props {
  onSelect: (tire: TireTypeEnum) => void;
  value?: TireTypeEnum;
}

export const TimerSelector = ({ onSelect, value }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(
    tires?.findIndex((tire) => tire === value) ?? 2
  );

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    onSelect?.(tires[index]);
  };

  const halfVisible = Math.floor(VISIBLE_TIRES / 2);
  const translateX = -ICON_SIZE * (selectedIndex - halfVisible);

  return (
    <Box
      display={'flex'}
      marginY={'20px'}
      width={`${ICON_SIZE * VISIBLE_TIRES}px`}
      justifyContent={'center'}
      position='relative'
      overflow='hidden'
      style={{
        maskImage:
          'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,1) 80%, rgba(255,255,255,0) 100%)',
      }}
    >
      <Box
        display={'flex'}
        data-pw-id={'timer-selector'}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {tires.map((tire, index) => (
          <Box
            key={index}
            cursor={'pointer'}
            data-pw-id={`tire-${index}`}
            onClick={() => handleClick(index)}
            style={{
              backgroundImage: `url(${asset('/images/tires.webp')})`,
              backgroundSize: `${ICON_SIZE * TOTAL_ICONS}px auto`,
              backgroundPositionX: `-${ICON_SIZE * index}px`,
              width: `${ICON_SIZE}px`,
              height: `${ICON_SIZE}px`,
              opacity: index === selectedIndex ? 1 : 0.5,
              transition: 'opacity 0.3s',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
