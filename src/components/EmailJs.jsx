import emailjs from 'emailjs-com';

const EmailJs = () => {
	const sendEmail = (templateId, templateParams, userId) => {
		return emailjs
			.send('service_lsxtrxe', templateId, templateParams, userId)
			.then((response) => {
				console.log('Email sent successfully:', response.status, response.text);
			})
			.catch((error) => {
				console.error('Error sending email:', error);
			});
	};

	return { sendEmail };
};

export default EmailJs;
