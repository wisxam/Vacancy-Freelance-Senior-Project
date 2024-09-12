export const tokens = (mode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					// palette values for light mode
					// text: {
					// 	primary: grey[900],
					// 	secondary: grey[800],
					// },
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  }
			: {
					// palette values for dark mode
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  }),
	},
});
