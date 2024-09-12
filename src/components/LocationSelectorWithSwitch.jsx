/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
	Box,
	TextField,
	Typography,
	FormControlLabel,
	Switch,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const fetchLocationName = async (lat, lng) => {
	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
		);
		const data = await response.json();
		return data.display_name || `${lat}, ${lng}`;
	} catch (error) {
		console.error('Error fetching location name:', error);
		return `${lat}, ${lng}`;
	}
};

// eslint-disable-next-line react/prop-types
const LocationSelectorWithSwitch = ({ label, field, formik }) => {
	const [useMap, setUseMap] = useState(false);
	const [position, setPosition] = useState(null);

	const LocationSelector = () => {
		// eslint-disable-next-line no-unused-vars
		const map = useMapEvents({
			click: async (e) => {
				const { lat, lng } = e.latlng;
				setPosition(e.latlng);
				const locationName = await fetchLocationName(lat, lng);
				formik.setFieldValue(field, locationName);
			},
		});

		return position ? <Marker position={position} /> : null;
	};

	return (
		<>
			<Typography
				variant='body1'
				sx={{ color: 'white' }}>
				{label}
			</Typography>
			<FormControlLabel
				control={
					<Switch
						checked={useMap}
						onChange={() => setUseMap((prev) => !prev)}
						name={`useMapFor${field}`}
						color='primary'
					/>
				}
				label={`Use Map for ${label}`}
			/>
			{useMap ? (
				<Box
					sx={{
						width: '100%',
						height: '300px',
						'& .leaflet-container': { height: '100%' },
					}}>
					<MapContainer
						center={[33.5138, 36.2765]}
						zoom={12}
						scrollWheelZoom={false}>
						<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
						<LocationSelector />
					</MapContainer>
				</Box>
			) : (
				<TextField
					fullWidth
					id={field}
					name={field}
					label={label}
					value={formik.values[field]}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched[field] && Boolean(formik.errors[field])}
					helperText={formik.touched[field] && formik.errors[field]}
					variant='filled'
				/>
			)}
		</>
	);
};

export default LocationSelectorWithSwitch;
