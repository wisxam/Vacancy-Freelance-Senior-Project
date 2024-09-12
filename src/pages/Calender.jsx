import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
	Paper,
	Stack,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
	TextField,
	Box,
	Snackbar,
	Alert,
	Typography,
} from '@mui/material';
import { formatDate } from '@fullcalendar/core';
import '../styles/calender.css';
import useAuthUser from '../utils/AuthUser';

function renderEventContent(eventInfo) {
	return (
		<>
			<b>{eventInfo.timeText}</b>
			<i>{eventInfo.event.title}</i>
		</>
	);
}

function renderSidebarEvent(event) {
	return (
		<li key={event.id}>
			<b>
				{formatDate(event.start, {
					year: 'numeric',
					month: 'short',
					day: 'numeric',
				})}
			</b>
			<i>{event.title}</i>
		</li>
	);
}

const Calender = () => {
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [weekendsVisible] = useState(true);
	const [currentEvents, setCurrentEvents] = useState([]);
	const [open, setOpen] = useState(false);
	const [eventTitle, setEventTitle] = useState('');
	const [selectInfo, setSelectInfo] = useState(null);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [deleteEventInfo, setDeleteEventInfo] = useState(null);
	const [eventGuid, setEventGuid] = useState(0);
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);
	const [confirmOpen, setConfirmOpen] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = getUser();
				setUserData(user);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (userData) {
			const storageKey = `company_events_${userData?.company?.id}_${userData?.id}`;
			const storedEvents = JSON.parse(localStorage.getItem(storageKey)) || [];
			setCurrentEvents(storedEvents);

			if (storedEvents.length > 0) {
				const maxId = Math.max(
					...storedEvents.map((event) => parseInt(event.id, 10))
				);
				setEventGuid(maxId + 1);
			}
		}
	}, [userData]);

	const createEventId = () => {
		const newId = eventGuid;
		setEventGuid(newId + 1);
		return String(newId);
	};

	const sanitizeEvent = (event) => {
		return {
			id: event.id,
			title: event.title,
			start: event.start,
			end: event.end,
			allDay: event.allDay,
		};
	};

	const handleDeleteAllEvents = () => {
		if (userData) {
			const storageKey = `company_events_${userData?.company?.id}_${userData?.id}`;
			setCurrentEvents([]);
			localStorage.removeItem(storageKey);
		}
		if (currentEvents) {
			setSnackbarOpenSuccess(true);
		}
	};

	const handleDateSelect = (selectInfo) => {
		setSelectInfo(selectInfo);
		setEventTitle('');
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);

		if (selectInfo) {
			let calendarApi = selectInfo.view.calendar;
			calendarApi.unselect();
		}
		setSelectInfo(null);
	};

	const handleCloseSnackBar = () => {
		setSnackbarOpenSuccess(false);
	};

	const handleAddEvent = (e) => {
		e.preventDefault();
		if (selectInfo && eventTitle) {
			let calendarApi = selectInfo.view.calendar;
			const newEvent = {
				id: createEventId(),
				title: eventTitle,
				start: selectInfo.startStr,
				end: selectInfo.endStr,
				allDay: selectInfo.allDay,
			};
			calendarApi.addEvent(newEvent);
			const updatedEvents = [...currentEvents, newEvent];
			setCurrentEvents(updatedEvents.map(sanitizeEvent));
			if (userData) {
				const storageKey = `company_events_${userData?.company?.id}_${userData?.id}`;
				localStorage.setItem(
					storageKey,
					JSON.stringify(updatedEvents.map(sanitizeEvent))
				);
			}
			setSnackbarOpenSuccess(true);
			setOpen(false);
			setSelectInfo(null);
		}
	};

	const handleEventChange = (eventChangeInfo) => {
		const { event } = eventChangeInfo;
		const updatedEvents = currentEvents.map((currentEvent) => {
			if (currentEvent.id === event.id) {
				return {
					...currentEvent,
					start: event.startStr,
					end: event.endStr,
				};
			}
			return currentEvent;
		});
		setCurrentEvents(updatedEvents);
		if (userData) {
			const storageKey = `company_events_${userData?.company?.id}_${userData?.id}`;
			localStorage.setItem(storageKey, JSON.stringify(updatedEvents));
		}
	};

	const handleEventClick = (clickInfo) => {
		setDeleteEventInfo(clickInfo);
		setDeleteOpen(true);
	};

	const handleDeleteClose = () => {
		setDeleteOpen(false);
		setDeleteEventInfo(null);
	};

	const handleDeleteEvent = () => {
		if (deleteEventInfo) {
			console.log('Deleting event:', deleteEventInfo.event);
			deleteEventInfo.event.remove();
			const updatedEvents = currentEvents.filter(
				(event) => event.id !== deleteEventInfo.event.id
			);

			console.log('Updated events:', updatedEvents);

			setCurrentEvents(updatedEvents);
			if (userData) {
				const storageKey = `company_events_${userData?.company?.id}_${userData?.id}`;
				localStorage.setItem(storageKey, JSON.stringify(updatedEvents));
				console.log('Events saved to localStorage with key:', storageKey);
			}
		}
		handleDeleteClose();
	};

	const handleEvents = (events) => {
		setCurrentEvents(events.map(sanitizeEvent));
	};

	return (
		<Box>
			<Dialog
				open={open}
				onClose={handleClose}>
				<DialogTitle>Add New Event</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please enter a title for your event.
					</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='name'
						label='Event Title'
						type='text'
						fullWidth
						variant='standard'
						value={eventTitle}
						onChange={(e) => setEventTitle(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleAddEvent}>Add Event</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={deleteOpen}
				onClose={handleDeleteClose}>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete the event{' '}
						{deleteEventInfo?.event.title}?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDeleteClose}>Cancel</Button>
					<Button onClick={handleDeleteEvent}>Delete</Button>
				</DialogActions>
			</Dialog>

			<Box
				sx={{
					display: 'flex',
					alignContent: 'center',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Button
					onClick={() => (currentEvents.length ? setConfirmOpen(true) : '')}
					variant='outlined'
					color='error'>
					Delete All Events
				</Button>
			</Box>
			<Dialog
				open={confirmOpen}
				onClose={() => setConfirmOpen(false)}>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent>
					<Typography>Are You Sure Of Deleting All The Events?</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setConfirmOpen(false)}
						color='secondary'>
						No
					</Button>
					<Button
						onClick={() => {
							handleDeleteAllEvents();
							setConfirmOpen(false);
						}}
						color='secondary'>
						Yes
					</Button>
				</DialogActions>
			</Dialog>

			<Stack direction={'row'}>
				<Paper className='demo-app-sidebar'>
					<h2 style={{ textAlign: 'center' }}>
						All Events ({currentEvents.length})
					</h2>
					<ul>{currentEvents.map(renderSidebarEvent)}</ul>
				</Paper>

				<div className='demo-app-main'>
					<FullCalendar
						eventChange={handleEventChange}
						key={currentEvents.length}
						plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
						headerToolbar={{
							left: 'prev,next today',
							center: 'title',
							right: 'dayGridMonth,timeGridWeek,timeGridDay',
						}}
						initialView='dayGridMonth'
						editable={true}
						selectable={true}
						selectMirror={true}
						dayMaxEvents={true}
						weekends={weekendsVisible}
						select={handleDateSelect}
						eventContent={renderEventContent}
						eventClick={handleEventClick}
						eventsSet={handleEvents}
						initialEvents={currentEvents}
					/>
				</div>
			</Stack>

			<Snackbar
				open={snackbarOpenSuccess}
				autoHideDuration={6000}
				onClose={handleCloseSnackBar}>
				<Alert
					onClose={handleCloseSnackBar}
					severity='success'>
					تمت العملية بنجاح
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default Calender;
