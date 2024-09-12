import { useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
	initial: {
		opacity: 0,
	},
	in: {
		opacity: 1,
	},
	out: {
		opacity: 0,
	},
};

const pageTransition = {
	duration: 0.2,
};

const AnimatedRoutes = () => {
	const location = useLocation();

	return (
		<AnimatePresence mode='wait'>
			<motion.div
				key={location.pathname}
				initial='initial'
				animate='in'
				exit='out'
				variants={pageVariants}
				transition={pageTransition}
				style={{ position: 'relative', width: '100%' }}>
				<Outlet />
			</motion.div>
		</AnimatePresence>
	);
};

export default AnimatedRoutes;
