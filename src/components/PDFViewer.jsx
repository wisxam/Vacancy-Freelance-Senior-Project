import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// eslint-disable-next-line react/prop-types
const PDFViewer = ({ cvUrl }) => {
	return (
		<Document file={cvUrl}>
			<Page pageNumber={1} />
		</Document>
	);
};

export default PDFViewer;
