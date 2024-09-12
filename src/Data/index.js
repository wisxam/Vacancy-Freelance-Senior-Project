import * as yup from 'yup';

const employeeTypes = [
	{
		id: 1,
		name: 'مسؤول التأمينات',
		description:
			'مسؤول عن إدارة وتنسيق عقود التأمين ومعالجة المطالبات التأمينية.',
	},
	{
		id: 2,
		name: 'مسؤول مطالبات التأمين',
		description:
			'مسؤول عن معالجة المطالبات التأمينية والتحقق من صحة البيانات والمستندات المقدمة.',
	},
	{
		id: 3,
		name: 'مستشار تأمين',
		description:
			'مسؤول عن تقديم الاستشارات للعملاء بشأن خيارات التأمين المختلفة.',
	},
	{
		id: 4,
		name: 'محلل تأمين',
		description: 'مسؤول عن تحليل بيانات التأمين وتقييم المخاطر المرتبطة بها.',
	},
	{
		id: 5,
		name: 'مدير مخاطر التأمين',
		description: 'مسؤول عن تحديد وإدارة المخاطر المرتبطة بسياسات التأمين.',
	},
	{
		id: 6,
		name: 'مدير خدمة العملاء',
		description:
			'مسؤول عن التعامل مع استفسارات وشكاوى العملاء المتعلقة بالتأمين.',
	},
	{
		id: 7,
		name: 'محاسب تأمين',
		description: 'مسؤول عن إدارة الشؤون المالية والحسابات المتعلقة بالتأمين.',
	},
	{
		id: 8,
		name: 'مخطط تأمين',
		description: 'مسؤول عن تخطيط وتطوير سياسات التأمين الجديدة.',
	},
	{
		id: 9,
		name: 'مسؤول تطوير الأعمال',
		description:
			'مسؤول عن تحديد فرص النمو وتطوير استراتيجيات لتوسيع قاعدة العملاء.',
	},
	{
		id: 10,
		name: 'مدير الامتثال التأميني',
		description: 'مسؤول عن ضمان الالتزام باللوائح والقوانين المتعلقة بالتأمين.',
	},
];

const busManufacturers = [
	{
		value: 'Daimler',
		label: 'Daimler AG',
	},
	{
		value: 'Volkswagen',
		label: 'Volkswagen Group',
	},
	{
		value: 'Volvo',
		label: 'Volvo Group',
	},
	{
		value: 'Scania',
		label: 'Scania AB',
	},
	{
		value: 'Toyota',
		label: 'Toyota Motor Corporation',
	},
	{
		value: 'Hyundai',
		label: 'Hyundai Motor Company',
	},
	{
		value: 'BYD',
		label: 'BYD Company Limited',
	},
	{
		value: 'Iveco',
		label: 'Iveco',
	},
	{
		value: 'Other',
		label: 'Other',
	},
];

const securityEmployeeTypes = [
	{
		id: 1,
		name: 'حارس أمن',
		description:
			'مسؤول عن حماية الممتلكات والأفراد في المواقع المختلفة وضمان سلامتهم.',
	},
	{
		id: 2,
		name: 'مدير الأمن',
		description: 'مسؤول عن التخطيط والإشراف على جميع أنشطة الأمن في الشركة.',
	},
	{
		id: 3,
		name: 'مراقب الكاميرات',
		description:
			'مسؤول عن مراقبة الأنظمة الأمنية المثبتة ورصد الأنشطة المشبوهة.',
	},
	{
		id: 4,
		name: 'محلل أمني',
		description:
			'مسؤول عن تحليل البيانات الأمنية وتقديم التوصيات لتعزيز الأمن والسلامة.',
	},
	{
		id: 5,
		name: 'فني أنظمة أمنية',
		description:
			'مسؤول عن تثبيت وصيانة أنظمة الأمن والمراقبة في المواقع المختلفة.',
	},
	{
		id: 6,
		name: 'مسؤول التدريب الأمني',
		description:
			'مسؤول عن تدريب العاملين على إجراءات الأمن والسلامة واستخدام الأدوات الأمنية.',
	},
	{
		id: 7,
		name: 'مدير التحقيقات',
		description: 'مسؤول عن إدارة التحقيقات في حالة وقوع حوادث أمنية أو سرقات.',
	},
	{
		id: 8,
		name: 'مشرف الحراسة',
		description: 'مسؤول عن إشراف وتنسيق عمل الحراس وتوزيع المهام عليهم.',
	},
	{
		id: 9,
		name: 'حارس VIP',
		description:
			'مسؤول عن حماية الشخصيات الهامة وتأمين سلامتهم وأماكن تواجدهم.',
	},
	{
		id: 10,
		name: 'مدير الأمن السيبراني',
		description:
			'مسؤول عن حماية البيانات والمعلومات الحساسة من الهجمات السيبرانية.',
	},
];

const securityVehiclesManufacturers = [
	{ value: 'mercedes', label: 'مرسيدس' },
	{ value: 'toyota', label: 'تويوتا' },
	{ value: 'ford', label: 'فورد' },
	{ value: 'other', label: 'غير ذلك' },
];

const status_activity = [
	{
		value: 'مكتبي',
		label: 'مكتبي',
	},
	{
		value: 'على الارض',
		label: 'على الارض',
	},
];

const employeeTypesTransportation = [
	{
		id: 1,
		name: 'سائق',
		description: 'مسؤول عن قيادة المركبات والتأكد من سلامة الركاب.',
	},
	{
		id: 2,
		name: 'مدير العمليات',
		description: 'مسؤول عن التخطيط والإشراف على جميع عمليات الشركة.',
	},
	{
		id: 3,
		name: 'ميكانيكي',
		description: 'مسؤول عن صيانة وإصلاح المركبات.',
	},
	{
		id: 4,
		name: 'موظف خدمة العملاء',
		description: 'مسؤول عن التعامل مع استفسارات وشكاوى العملاء.',
	},
	{
		id: 5,
		name: 'مراقب المرور',
		description: 'مسؤول عن متابعة حركة المركبات وضمان سير العمليات بفعالية.',
	},
	{
		id: 6,
		name: 'مسؤول الموارد البشرية',
		description: 'مسؤول عن توظيف وتدريب الموظفين وإدارة شؤونهم.',
	},
	{
		id: 7,
		name: 'محاسب',
		description: 'مسؤول عن إدارة الشؤون المالية والحسابات في الشركة.',
	},
	{
		id: 8,
		name: 'مخطط النقل',
		description: 'مسؤول عن تخطيط مسارات النقل وجدولتها.',
	},
	{
		id: 9,
		name: 'مشرف سلامة',
		description: 'مسؤول عن ضمان الالتزام بإجراءات السلامة والصحة المهنية.',
	},
	{
		id: 10,
		name: 'مشرف ورشة',
		description: 'مسؤول عن إدارة الورش وضمان سير العمل بسلاسة.',
	},
];

const employeeRatingsForm = [
	{ value: 5, label: 'ممتاز' },
	{ value: 4, label: 'جيد جدًا' },
	{ value: 3, label: 'جيد' },
	{ value: 2, label: 'مقبول' },
	{ value: 1, label: 'ضعيف' },
	{ value: 0, label: 'معلومات غير كافية' },
];

const broakerRatingForm = [
	{ value: 5, label: 'ممتاز' },
	{ value: 4, label: 'جيد جدًا' },
	{ value: 3, label: 'جيد' },
	{ value: 2, label: 'مقبول' },
	{ value: 1, label: 'ضعيف' },
	{ value: 0, label: 'معلومات غير كافية' },
];

const employeeRatingsTables = [
	{ value: 5, label: 'ممتاز' },
	{ value: 4, label: 'جيد جدًا' },
	{ value: 3, label: 'جيد' },
	{ value: 2, label: 'مقبول' },
	{ value: 1, label: 'ضعيف' },
];

const validationSchemaEmployees = yup.object().shape({
	name: yup.string().required('Name is required'),
	status: yup.string().required('Status is required'),
	type: yup.string().required('Type is required'),
	date: yup.string().required('Birth Date is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	address: yup.string().required('Address is required'),
	cv: yup.string().required('CV/Resume is required'),
	phone_number: yup.string().required('Phone Number is required'),
	rate: yup.string().required('Rate is required'),
});

const validationSchemaWeapons = yup.object({
	Wepon_Name: yup.string().required('Required'),
	Wepon_Number: yup.string().required('Required'),
	Wepon_Type: yup.string().required('Required'),
	Wepon_Category: yup.string().required('Required'),
	Acquisition_Date: yup.string().required('Required'),
	rarity: yup.string().required('Required'),
});

const insurancePartners = [
	{ type: 'شريك التأمين الصحي' },
	{ type: 'شريك تأمين السيارات' },
	{ type: 'شريك تأمين السفر' },
	{ type: 'شريك التأمين على الحياة' },
	{ type: 'شريك التأمين ضد الحوادث' },
	{ type: 'شريك التأمين على الممتلكات' },
	{ type: 'شريك التأمين البحري' },
	{ type: 'شريك التأمين ضد الحرائق' },
];

const contractStatuses = [
	{
		status: 'ساري',
		description: 'العقد ساري المفعول حاليًا',
		icon: 'CheckCircle',
		color: 'green',
	},
	{
		status: 'منتهي',
		description: 'العقد منتهي الصلاحية',
		icon: 'HighlightOff',
		color: 'red',
	},
	{
		status: 'معلق',
		description: 'العقد قيد الانتظار',
		icon: 'HourglassEmpty',
		color: 'orange',
	},
	{
		status: 'ملغي',
		description: 'العقد ملغي',
		icon: 'Cancel',
		color: 'grey',
	},
	{
		status: 'مؤجل',
		description: 'العقد مؤجل',
		icon: 'Schedule',
		color: 'blue',
	},
	{
		status: 'مكتمل',
		description: 'العقد مكتمل',
		icon: 'CheckCircleOutline',
		color: 'purple',
	},
];

const validationSchemaPartners = yup.object().shape({
	name: yup.string().required('Name is required'),
	type: yup.string().required('Type is required'),
	contract_status: yup.string().required('Contract status is required'),
	Certificate: yup.string().required('Certificate is required'),
	email: yup
		.string()
		.email('Invalid email address')
		.required('Email is required'),
	phone: yup.string().required('Phone number is required'),
	specialization: yup.string().required('Specialization is required'),
});

const validationSchemaReinsurer = yup.object({
	name: yup.string().required('Name is required'),
	address: yup.string().required('Address is required'),
	email: yup
		.string()
		.email('Enter a valid email')
		.required('Email is required'),
	phone: yup
		.string()
		.matches(/^[0-9]+$/, 'Enter a valid phone number')
		.required('Phone is required'),
	fax: yup
		.string()
		.matches(/^[0-9]+$/, 'Enter a valid fax number')
		.nullable(),
	reinsurer_type: yup.string().required('Reinsurer Type is required'),
});

const validationSchemaBroaker = yup.object({
	name: yup.string().required('Name is required'),
	percentage: yup.string().required('Percentage is required'),
	email: yup
		.string()
		.email('Enter a valid email')
		.required('Email is required'),
	phone: yup
		.string()
		.matches(/^[0-9]+$/, 'Enter a valid phone number')
		.required('Phone is required'),
	address: yup.string().required('Address is required'),
	rate: yup.number().required('Rate is required'),
});

const reinsurerTypes = [
	{ id: 1, value: 'إعادة تأمين إختياري' },
	{ id: 2, value: 'إعادة تأمين اتفاقي' },
	{ id: 3, value: 'إعادة تأمين نسبي' },
	{ id: 4, value: 'إعادة تأمين غير نسبي' },
	{ id: 5, value: 'إعادة التأمين العكسي' },
	{ id: 6, value: 'إعادة التأمين الأسرى' },
	{ id: 7, value: 'إعادة التأمين عن طريق النقابات' },
	{ id: 8, value: 'إعادة التأمين المتخصصة' },
	{ id: 9, value: 'إعادة تأمين المجمعات' },
	{ id: 10, value: 'وساطة إعادة التأمين' },
];

const broakerPercentage = [
	{ value: 5, label: '30%' },
	{ value: 4, label: '25%' },
	{ value: 3, label: '20%' },
	{ value: 2, label: '15%' },
	{ value: 1, label: '10%' },
];

const weaponConditions = [
	{
		id: 1,
		name: 'جديد',
		description: 'السلاح في حالة جديدة تماما، لم يستخدم من قبل.',
		name_en: 'New',
		description_en: 'The weapon is in brand new condition, never used before.',
		color: '#00FF00', // Green
	},
	{
		id: 2,
		name: 'جيد جدا',
		description: 'السلاح في حالة جيدة جدا، قد يكون تم استخدامه قليلا.',
		name_en: 'Very Good',
		description_en:
			'The weapon is in very good condition, might have been used slightly.',
		color: '#7FFF00', // Chartreuse Green
	},
	{
		id: 3,
		name: 'جيد',
		description: 'السلاح في حالة جيدة، مع وجود بعض العلامات الطفيفة للاستخدام.',
		name_en: 'Good',
		description_en:
			'The weapon is in good condition, with some minor signs of use.',
		color: '#FFFF00', // Yellow
	},
	{
		id: 4,
		name: 'مقبول',
		description: 'السلاح في حالة مقبولة، مع وجود علامات واضحة للاستخدام.',
		name_en: 'Acceptable',
		description_en:
			'The weapon is in acceptable condition, with clear signs of use.',
		color: '#FFA500', // Orange
	},
	{
		id: 5,
		name: 'سيء',
		description: 'السلاح في حالة سيئة، قد يحتاج إلى صيانة أو إصلاح.',
		name_en: 'Poor',
		description_en:
			'The weapon is in poor condition, may require maintenance or repair.',
		color: '#FF4500', // Orange Red
	},
	{
		id: 6,
		name: 'خردة',
		description: 'السلاح غير صالح للاستخدام، ويعتبر كخردة.',
		name_en: 'Scrap',
		description_en: 'The weapon is unserviceable and considered as scrap.',
		color: '#FF0000', // Red
	},
];

const weaponTypes = [
	{
		id: 1,
		name: 'بنادق آلية',
		description:
			'تشمل البنادق التي تستخدم آلية لتحديد الخرطوشة التالية للإطلاق.',
	},
	{
		id: 2,
		name: 'مسدسات',
		description:
			'تشمل الأسلحة اليدوية القصيرة التي تستخدم للدفاع الشخصي أو لأغراض تكتيكية.',
	},
	{
		id: 3,
		name: 'بنادق قناصة',
		description: 'تستخدم لإطلاق الرصاصات على مسافات طويلة بدقة عالية.',
	},
	{
		id: 4,
		name: 'رشاشات',
		description: 'تستخدم لإطلاق الرصاص بشكل متواصل على أهداف متعددة.',
	},
	{
		id: 5,
		name: 'قنابل يدوية',
		description: 'تستخدم للقاء الأهداف بشكل فعال في مدى قريب إلى متوسط.',
	},
];

const weaponCategories = [
	{ id: 1, name: 'آلي' },
	{ id: 2, name: 'نصف آلي' },
	{ id: 3, name: 'ثقيل' },
	{ id: 4, name: 'خفيف' },
	{ id: 5, name: 'قناصة' },
	{ id: 6, name: 'متفجرات' },
	{ id: 7, name: 'دفاعي' },
	{ id: 8, name: 'هجومي' },
	{ id: 9, name: 'شبه ثقيل' },
	{ id: 10, name: 'تكتيكي' },
];

const busStatus = [
	{
		value: 'غير متاح',
		label: 'غير متاح',
	},
	{
		value: 'متوفر',
		label: 'متوفر',
	},
	{
		value: 'في الصيانة',
		label: 'في الصيانة',
	},
];

const securityVehicleModels = {
	armored_vehicle: [
		{ value: 'g63_amg', label: 'G63 AMG', manufacturer: 'mercedes' },
		{
			value: 'land_cruiser_armored',
			label: 'لاند كروزر مدرعة',
			manufacturer: 'toyota',
		},
	],
	van: [
		{ value: 'mercedes_sprinter', label: 'سبرينتر', manufacturer: 'mercedes' },
	],
	SUV: [
		{ value: 'toyota_highlander', label: 'هايلاندر', manufacturer: 'toyota' },
	],
	patrol_car: [
		{ value: 'ford_interceptor', label: 'انترسيبتور', manufacturer: 'ford' },
	],
	truck: [{ value: 'ford_f150', label: 'F-150', manufacturer: 'ford' }],
};

const SecurityEmployeesTypes = [
	{
		id: 1,
		name: 'حارس أمن',
		description:
			'مسؤول عن حماية الممتلكات والأفراد في المواقع المختلفة وضمان سلامتهم.',
	},
	{
		id: 2,
		name: 'مدير الأمن',
		description: 'مسؤول عن التخطيط والإشراف على جميع أنشطة الأمن في الشركة.',
	},
	{
		id: 3,
		name: 'مراقب الكاميرات',
		description:
			'مسؤول عن مراقبة الأنظمة الأمنية المثبتة ورصد الأنشطة المشبوهة.',
	},
	{
		id: 4,
		name: 'محلل أمني',
		description:
			'مسؤول عن تحليل البيانات الأمنية وتقديم التوصيات لتعزيز الأمن والسلامة.',
	},
	{
		id: 5,
		name: 'فني أنظمة أمنية',
		description:
			'مسؤول عن تثبيت وصيانة أنظمة الأمن والمراقبة في المواقع المختلفة.',
	},
	{
		id: 6,
		name: 'مسؤول التدريب الأمني',
		description:
			'مسؤول عن تدريب العاملين على إجراءات الأمن والسلامة واستخدام الأدوات الأمنية.',
	},
	{
		id: 7,
		name: 'مدير التحقيقات',
		description: 'مسؤول عن إدارة التحقيقات في حالة وقوع حوادث أمنية أو سرقات.',
	},
	{
		id: 8,
		name: 'مشرف الحراسة',
		description: 'مسؤول عن إشراف وتنسيق عمل الحراس وتوزيع المهام عليهم.',
	},
	{
		id: 9,
		name: 'حارس VIP',
		description:
			'مسؤول عن حماية الشخصيات الهامة وتأمين سلامتهم وأماكن تواجدهم.',
	},
	{
		id: 10,
		name: 'مدير الأمن السيبراني',
		description:
			'مسؤول عن حماية البيانات والمعلومات الحساسة من الهجمات السيبرانية.',
	},
];

const route_type = [
	{ value: 'ذهاب', label: 'ذهاب' },
	{ value: 'عودة', label: 'عودة' },
];

const route_name = [
	{ value: 'ميسات', label: 'ميسات' },
	{ value: 'حاميش', label: 'حاميش' },
	{ value: 'عدوي', label: 'عدوي' },
	{ value: 'المالكي', label: 'المالكي' },
	{ value: 'غير ذلك', label: 'غير ذلك' },
];

const cleaningEquipments = [
	{ name: 'مكانس كهربائية' },
	{ name: 'مقشطات الأرضيات' },
	{ name: 'مستخلصات السجاد' },
	{ name: 'غسالات الضغط' },
	{ name: 'منظفات البخار' },
	{ name: 'ملمعات ومنظفات الأرضيات' },
	{ name: 'منقيات الهواء' },
	{ name: 'مكانس صناعية' },
];

const cleaningCompaniesManufacturers = [
	{
		name: 'Procter & Gamble (P&G)',
		description:
			'Known for brands like Swiffer, Mr. Clean, Tide, and Febreze, P&G manufactures a wide range of cleaning products for both household and commercial use.',
	},
	{
		name: 'The Clorox Company',
		description:
			'Clorox is a leading manufacturer of cleaning and disinfecting products, including Clorox bleach, disinfecting wipes, and Green Works natural cleaning products.',
	},
	{
		name: 'SC Johnson',
		description:
			'SC Johnson produces a variety of household cleaning brands, such as Windex, Scrubbing Bubbles, Pledge, and Glade.',
	},
	{
		name: 'Ecolab',
		description:
			'Ecolab specializes in commercial cleaning and sanitation solutions for industries like hospitality, healthcare, food service, and manufacturing.',
	},
	{
		name: '3M',
		description:
			'3M manufactures a diverse range of cleaning products, including Scotch-Brite cleaning tools, Scotchgard fabric protector, and Command adhesive hooks.',
	},
	{
		name: 'Reckitt Benckiser (RB)',
		description:
			'RB owns brands like Lysol, Dettol, Woolite, and Finish, offering a wide range of cleaning and hygiene products.',
	},
	{
		name: 'Kärcher',
		description:
			'Kärcher is a German company known for its high-pressure cleaners, steam cleaners, vacuum cleaners, and other professional cleaning equipment.',
	},
	{
		name: 'Nilfisk',
		description:
			'Nilfisk produces industrial and commercial cleaning equipment, including floor scrubbers, vacuum cleaners, and high-pressure washers.',
	},
	{
		name: 'Hoover',
		description:
			'Hoover manufactures a variety of vacuum cleaners, carpet cleaners, and hard floor cleaners for both residential and commercial use.',
	},
	{
		name: 'Diversey',
		description:
			'Diversey provides cleaning, sanitizing, and hygiene solutions for various industries, including healthcare, food service, and facilities management.',
	},
	{
		name: 'Other',
		description: 'Other',
	},
];

const cleaningEquipmentSituations = [
	{ value: 'new', label: 'جديد' },
	{ value: 'used', label: 'مستعمل' },
	{ value: 'needs_repair', label: 'يحتاج إلى إصلاح' },
	{ value: 'recovered', label: 'مستعاد' },
	{ value: 'discarded', label: 'مستبعد' },
	{ value: 'refurbished', label: 'مجدد' },
	{ value: 'in_storage', label: 'في التخزين' },
	{ value: 'under_inspection', label: 'تحت الفحص' },
	{ value: 'being_cleaned', label: 'يتم تنظيفه' },
	{ value: 'reserved_for_event', label: 'محجوز لحدث' },
	{ value: 'non_operational', label: 'غير صالح للتشغيل' },
	{ value: 'other', label: 'غير ذلك' },
];

const securityVehicles = [
	{
		value: 'armored_vehicle',
		label: 'مركبة مدرعة',
		models: [
			{ value: 'g63_amg', label: 'مرسيدس G63 AMG' },
			{ value: 'land_cruiser_armored', label: 'تويوتا لاند كروزر مدرعة' },
			{ value: 'armored_suv', label: 'SUV مدرعة' },
		],
	},
	{
		value: 'patrol_car',
		label: 'سيارة دورية',
		models: [
			{ value: 'ford_interceptor', label: 'فورد انترسيبتور' },
			{ value: 'chevy_tahoe', label: 'شيفروليه تاهو' },
			{ value: 'dodge_charger', label: 'دودج تشارجر' },
			{ value: 'other than that', label: 'غير ذلك' },
		],
	},
	{
		value: 'motorcycle',
		label: 'دراجة نارية',
		models: [
			{ value: 'bmw_r1200', label: 'بي ام دبليو R1200' },
			{ value: 'harley_davidson', label: 'هارلي ديفيدسون' },
			{ value: 'honda_goldwing', label: 'هوندا جولد وينج' },
			{ value: 'other than that', label: 'غير ذلك' },
		],
	},
	{
		value: 'SUV',
		label: 'سيارة رياضية متعددة الأغراض',
		models: [
			{ value: 'ford_explorer', label: 'فورد اكسبلورر' },
			{ value: 'jeep_grand_cherokee', label: 'جيب جراند شيروكي' },
			{ value: 'toyota_highlander', label: 'تويوتا هايلاندر' },
			{ value: 'other than that', label: 'غير ذلك' },
		],
	},
	{
		value: 'van',
		label: 'شاحنة صغيرة',
		models: [
			{ value: 'ford_transit', label: 'فورد ترانزيت' },
			{ value: 'mercedes_sprinter', label: 'مرسيدس سبرينتر' },
			{ value: 'chevy_express', label: 'شيفروليه اكسبريس' },
			{ value: 'other than that', label: 'غير ذلك' },
		],
	},
	{
		value: 'truck',
		label: 'شاحنة',
		models: [
			{ value: 'ford_f150', label: 'فورد F-150' },
			{ value: 'chevy_silverado', label: 'شيفروليه سيلفرادو' },
			{ value: 'ram_1500', label: 'رام 1500' },
			{ value: 'other than that', label: 'غير ذلك' },
		],
	},
	{
		value: 'helicopter',
		label: 'طائرة هليكوبتر',
		models: [
			{ value: 'bell_206', label: 'بيل 206' },
			{ value: 'eurocopter_ec135', label: 'يوروكوبتر EC135' },
			{ value: 'robinson_r44', label: 'روبنسون R44' },
			{ value: 'other than that', label: 'غير ذلك' },
		],
	},
	{
		value: 'drone',
		label: 'طائرة بدون طيار',
		models: [
			{ value: 'dji_phantom_4', label: 'دي جي آي فانتوم 4' },
			{ value: 'mavic_pro', label: 'مافيك برو' },
			{ value: 'parrot_anafi', label: 'باروت أنافي' },
			{ value: 'other than that', label: 'غير ذلك' },
		],
	},
];

const jobValidationSchema = yup.object().shape({
	place: yup.string().required('Place is required'),
	name: yup.string().required('Name is required'),
	job_title: yup.string().required('Job title is required'),
	phone: yup
		.string()
		.required('Phone number is required')
		.matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, 'Phone number is not valid'),
	email: yup
		.string()
		.required('Email is required')
		.email('Invalid email address'),
	type: yup
		.string()
		.required('Type is required')
		.oneOf(
			['Full-time', 'Part-time', 'Contract', 'Internship', 'Other'],
			'Invalid job type'
		),
	image: yup.mixed().required('Upload Picture'),
	job_description: yup.mixed().required('Job description is required'),
	// job_description: yup
	// 	.string()
	// 	.required('Job description is required')
	// 	.max(1000, 'Job description cannot be more than 1000 characters'),
	// CV: yup.mixed().required('CV is required'),
	// .test(
	// 	'fileFormat',
	// 	'Only PDF files are allowed',
	// 	(value) => value && value.type === 'application/pdf'
	// )
	// .test(
	// 	'fileSize',
	// 	'File size is too large',
	// 	(value) => value && value.size <= 5 * 1024 * 1024
	// ), // 5 MB limit
});

const jobTypes = [
	{ value: 'Full-time', label: 'Full-time' },
	{ value: 'Part-time', label: 'Part-time' },
	{ value: 'Contract', label: 'Contract' },
	{ value: 'Internship', label: 'Internship' },
	{ value: 'Other', label: 'Other' },
];

const busValidationSchema = yup.object({
	status: yup.string().required('يرجى اختيار الحالة'),
	license_plate: yup.string().required('يرجى إدخال لوحة الترخيص'),
	capacity: yup
		.number()
		.required('يرجى إدخال السعة')
		.positive('يجب أن تكون قيمة موجبة'),
	make: yup.string().required('يرجى اختيار الشركة المصنعة'),
	model: yup.string().required('يرجى إدخال الموديل'),
	year: yup
		.string()
		.required('يرجى إدخال السنة')
		.matches(/^[0-9]{4}$/, 'الرجاء إدخال سنة صحيحة'),
	image: yup.mixed().required('يرجى تحميل صورة'),
	// .test(
	// 	'fileSize',
	// 	'حجم الصورة كبير جدًا',
	// 	(value) => value && value.size <= 2000000
	// )
	// .test(
	// 	'fileFormat',
	// 	'تنسيق غير مدعوم',
	// 	(value) => value && ['image/jpeg', 'image/png'].includes(value.type)
	// ),
});

const equipmentValidationSchema = yup.object().shape({
	type: yup.string().required('Type is required'),
	quantity: yup
		.number()
		.required('Quantity is required')
		.positive('Quantity must be a positive number')
		.integer('Quantity must be an integer'),
	image: yup.string().required('Image is required'),
	name: yup.string().required('Name is required'),
	status: yup.string().required('Status is required'),
	situation: yup.string().required('Situation is required'),
	manufacturare: yup.string().required('Manufacturer is required'),
	date: yup.date().required('Date is required').nullable(),
});

const cleaningEquipmentStatuses = [
	{ value: 'متاح', label: 'متاح' },
	{ value: 'قيد الاستخدام', label: 'قيد الاستخدام' },
	{ value: 'تحت الصيانة', label: 'تحت الصيانة' },
	{ value: 'خارج الخدمة', label: 'خارج الخدمة' },
	{ value: 'محجوز', label: 'محجوز' },
	{ value: 'غير ذلك', label: 'غير ذلك' },
];

const transportationEmployeeTypes = [
	{
		id: 1,
		name: 'سائق',
		description: 'مسؤول عن قيادة المركبات والتأكد من سلامة الركاب.',
	},
	{
		id: 2,
		name: 'مدير العمليات',
		description: 'مسؤول عن التخطيط والإشراف على جميع عمليات الشركة.',
	},
	{
		id: 3,
		name: 'ميكانيكي',
		description: 'مسؤول عن صيانة وإصلاح المركبات.',
	},
	{
		id: 4,
		name: 'موظف خدمة العملاء',
		description: 'مسؤول عن التعامل مع استفسارات وشكاوى العملاء.',
	},
	{
		id: 5,
		name: 'مراقب المرور',
		description: 'مسؤول عن متابعة حركة المركبات وضمان سير العمليات بفعالية.',
	},
	{
		id: 6,
		name: 'مسؤول الموارد البشرية',
		description: 'مسؤول عن توظيف وتدريب الموظفين وإدارة شؤونهم.',
	},
	{
		id: 7,
		name: 'محاسب',
		description: 'مسؤول عن إدارة الشؤون المالية والحسابات في الشركة.',
	},
	{
		id: 8,
		name: 'مخطط النقل',
		description: 'مسؤول عن تخطيط مسارات النقل وجدولتها.',
	},
	{
		id: 9,
		name: 'مشرف سلامة',
		description: 'مسؤول عن ضمان الالتزام بإجراءات السلامة والصحة المهنية.',
	},
	{
		id: 10,
		name: 'مشرف ورشة',
		description: 'مسؤول عن إدارة الورش وضمان سير العمل بسلاسة.',
	},
];

const transportationValidationSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	status: yup.string().required('Status is required'),
	type: yup.string().required('Type is required'),
	date: yup.string().required('Birth Date is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	address: yup.string().required('Address is required'),
	cv: yup.string().required('CV/Resume is required'),
	phone_number: yup.string().required('Phone Number is required'),
	rate: yup.string().required('Rate is required'),
});

const securityStatus_activity = [
	{
		value: 'داخل المبنى',
		label: 'داخل المبنى',
	},
	{
		value: 'في الدورية',
		label: 'في الدورية',
	},
	{
		value: 'في الحراسة',
		label: 'في الحراسة',
	},
	{
		value: 'في التحقيق',
		label: 'في التحقيق',
	},
	{
		value: 'غير ذلك',
		label: 'غير ذلك',
	},
];

const cleaningEmployeeTypes = [
	{
		id: 1,
		name: 'عامل تنظيف',
		description: 'مسؤول عن تنفيذ عمليات التنظيف وتنظيف المساحات بفعالية.',
	},
	{
		id: 2,
		name: 'مدير العمليات التنظيفية',
		description: 'مسؤول عن تخطيط وإشراف على جميع عمليات التنظيف في الشركة.',
	},
	{
		id: 3,
		name: 'مشرف تنظيف',
		description: 'مسؤول عن مراقبة تنفيذ عمليات التنظيف وضمان جودتها وفعاليتها.',
	},
	{
		id: 4,
		name: 'فني صيانة وتنظيف',
		description: 'مسؤول عن صيانة وتنظيف المعدات والأدوات المستخدمة في التنظيف.',
	},
	{
		id: 5,
		name: 'مشرف السلامة والصحة المهنية',
		description:
			'مسؤول عن تطبيق ومتابعة إجراءات السلامة والصحة المهنية في مواقع العمل.',
	},
	{
		id: 6,
		name: 'موظف خدمة العملاء في التنظيف',
		description:
			'مسؤول عن استقبال استفسارات وشكاوى العملاء وتقديم الدعم الفني اللازم.',
	},
	{
		id: 7,
		name: 'مدير التدريب والتطوير في التنظيف',
		description:
			'مسؤول عن تطوير برامج التدريب وتنفيذها لتحسين مهارات فريق التنظيف.',
	},
	{
		id: 8,
		name: 'مشرف المخزون في التنظيف',
		description:
			'مسؤول عن إدارة المخزون وتوزيع المواد والمعدات اللازمة لعمليات التنظيف.',
	},
	{
		id: 9,
		name: 'مدير العلاقات العامة في التنظيف',
		description:
			'مسؤول عن بناء وصيانة علاقات إيجابية مع العملاء والشركات المعنية.',
	},
	{
		id: 10,
		name: 'محاسب في التنظيف',
		description: 'مسؤول عن إدارة الشؤون المالية والحسابات في قطاع التنظيف.',
	},
];

const securityValidationSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	status: yup.string().required('Status is required'),
	type: yup.string().required('Type is required'),
	date: yup.string().required('Birth Date is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	address: yup.string().required('Address is required'),
	cv: yup.string().required('CV/Resume is required'),
	phone_number: yup.string().required('Phone Number is required'),
	rate: yup.string().required('Rate is required'),
});

export {
	employeeTypes as employeeInsuranceType,
	busManufacturers,
	status_activity,
	employeeTypesTransportation,
	employeeRatingsForm,
	employeeRatingsTables,
	validationSchemaEmployees,
	insurancePartners,
	contractStatuses,
	validationSchemaPartners,
	validationSchemaReinsurer,
	reinsurerTypes,
	broakerPercentage,
	validationSchemaBroaker,
	broakerRatingForm,
	weaponConditions,
	weaponTypes,
	weaponCategories,
	validationSchemaWeapons,
	busStatus,
	SecurityEmployeesTypes,
	route_type,
	route_name,
	cleaningEquipments,
	cleaningCompaniesManufacturers,
	securityVehicles,
	securityVehiclesManufacturers,
	securityVehicleModels,
	busValidationSchema,
	jobValidationSchema,
	equipmentValidationSchema,
	cleaningEquipmentStatuses,
	cleaningEquipmentSituations,
	jobTypes,
	transportationEmployeeTypes,
	transportationValidationSchema,
	securityEmployeeTypes,
	securityStatus_activity,
	securityValidationSchema,
	cleaningEmployeeTypes,
};
