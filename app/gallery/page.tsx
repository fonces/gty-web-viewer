'use client'
import Page from "@/components/Page";
import { css } from "@emotion/react";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';

const styles = {
  img: css`
    object-fit: contain;
    width: 100%;
  `,
}

const images = [
  ...Array(12).fill(null).map((_, index) => ({
    src: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/${index + 1}.jpeg`,
    alt: `画像${index + 1}`,
  })),
  // {
  //   src: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/test.png`,
  //   alt: "Coming Soon...",
  // },
];

export default function Gallery() {
  return (
    <Page>
      <Typography variant="h4" gutterBottom>ギャラリー</Typography>
      <Box sx={{ display: 'grid', gap: '24px' }}>
        {images.map((image, index) => (
          <Box>
            <Typography variant="h6" gutterBottom>{image.alt}</Typography>
            <img
              key={index}
              css={styles.img}
              src={image.src}
              alt={image.alt}
            />
          </Box>
        ))}
      </Box>
    </Page>
  );
}
