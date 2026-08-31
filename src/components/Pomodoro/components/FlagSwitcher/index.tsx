import { Box, Image } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import useSessionStore from '@/stores/Session.store';
import { useEffect } from 'react';
import { FlagEnum } from '@/enums/Flag.enum';
import { asset } from '@/utils/asset';

const flash = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

export const FlagSwitcher = () => {
  const flag = useSessionStore((state) => state.flag);

  useEffect(() => {
    if (flag) {
      if (flag !== FlagEnum.YELLOW) {
        const interval = setInterval(() => {
          useSessionStore.setState({ flag: null });
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [flag]);

  if (!flag) return null;
  return (
    <Box>
      <Image
        data-pw-id={`flag-${flag}`}
        src={asset(`/images/${flag}-flag.webp`)}
        alt={'absolute'}
        w='auto'
        maxW='50px'
        h='auto'
        animation={`${flash} 0.5s infinite`}
      />
    </Box>
  );
};
