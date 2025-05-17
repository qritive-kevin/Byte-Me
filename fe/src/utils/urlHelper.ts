// src/utils/urlHelper.ts
export const getFullAssetUrl = (path: string): string => {
  const base = process.env.REACT_APP_BASE_URL || "";
  return path?.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
};


// <CardMedia
//           component="img"
//           image={getFullAssetUrl(image?.[0] || "/default.jpg")}
//           alt={title}
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//           }}
//         />