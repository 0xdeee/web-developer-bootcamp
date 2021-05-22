// const rainbowColors = (color, nextColor) => {
//   setTimeout(() => {
//     document.body.style.backgroundColor = color;
//     nextColor && nextColor();
//   }, 1000);
// };

// rainbowColors('red', () => {
//   rainbowColors('orange', () => {
//     rainbowColors('yellow', () => {
//       rainbowColors('green', () => {
//         rainbowColors('blue', () => {
//           rainbowColors('indigo', () => {
//             rainbowColors('violet', () => {});
//           });
//         });
//       });
//     });
//   });
// });

const rainbowColors = async (color) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = color;
      resolve();
    }, 1000);
  });
};

const rainbow = async () => {
  await rainbowColors('red');
  await rainbowColors('orange');
  await rainbowColors('yellow');
  await rainbowColors('blue');
  await rainbowColors('green');
  await rainbowColors('indigo');
  await rainbowColors('violet');
};

rainbow();
