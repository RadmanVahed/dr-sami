import { eq, count } from 'drizzle-orm'
import { useDb } from '../utils/db'
import { users, categories, posts, attachments, faqs } from '../db/schema'
const legacyServices = [
  { key: 'asthmaAllergy', slug: 'asthma-allergy', image: '/images/services/asthma-allergy.png' },
  { key: 'copd', slug: 'copd', image: '/images/services/copd.png' },
  { key: 'bronchoscopy', slug: 'bronchoscopy', image: '/images/services/bronchoscopy.png' },
  { key: 'spirometry', slug: 'spirometry', image: '/images/services/spirometry.png' },
  { key: 'ildFibrosis', slug: 'ild-fibrosis', image: '/images/services/ild-fibrosis.png' },
  { key: 'sleepApnea', slug: 'sleep-apnea', image: '/images/services/sleep-apnea.png' },
  { key: 'cancerScreening', slug: 'lung-cancer-screening', image: '/images/services/lung-cancer-screening.png' },
  { key: 'consultation', slug: 'consultation', image: '/images/services/consultation.png' }
]

const DEFAULT_VIDEO = 'https://www.aparat.com/video/video/embed/videohash/836Gy/vt/frame'

const serviceTranslations: Record<string, { fa: { title: string, description: string }, en: { title: string, description: string } }> = {
  asthmaAllergy: {
    fa: {
      title: 'تشخیص و درمان آسم و آلرژی‌های تنفسی',
      description: 'ارائه جدیدترین روش‌های تشخیصی و درمانی برای کنترل کامل آسم و آلرژی‌ها در کودکان و بزرگسالان، جهت بهبود کیفیت زندگی و تنفس راحت.'
    },
    en: {
      title: 'Diagnosis and Treatment of Asthma and Respiratory Allergies',
      description: 'Providing the latest diagnostic and therapeutic methods for complete control of asthma and allergies in children and adults, to improve quality of life and comfortable breathing.'
    }
  },
  copd: {
    fa: {
      title: 'مدیریت بیماری‌های مزمن انسدادی ریه (COPD)',
      description: 'برنامه‌ریزی درمانی جامع شامل دارودرمانی، بازتوانی ریوی و آموزش‌های لازم برای کاهش علائم و جلوگیری از پیشرفت بیماری.'
    },
    en: {
      title: 'Management of Chronic Obstructive Pulmonary Disease (COPD)',
      description: 'Comprehensive treatment planning including medication, pulmonary rehabilitation, and necessary education to reduce symptoms and prevent disease progression.'
    }
  },
  bronchoscopy: {
    fa: {
      title: 'برونکوسکوپی تشخیصی و درمانی',
      description: 'انجام برونکوسکوپی با تجهیزات پیشرفته برای نمونه‌برداری (بیوپسی)، تشخیص دقیق بیماری‌های ریوی و انجام اقدامات درمانی لازم.'
    },
    en: {
      title: 'Diagnostic and Therapeutic Bronchoscopy',
      description: 'Performing bronchoscopy with advanced equipment for sampling (biopsy), accurate diagnosis of lung diseases, and necessary therapeutic interventions.'
    }
  },
  spirometry: {
    fa: {
      title: 'تست‌های عملکرد ریوی (اسپیرومتری)',
      description: 'ارزیابی دقیق ظرفیت و عملکرد ریه‌ها از طریق اسپیرومتری برای تشخیص صحیح بیماری‌ها و پایش روند درمان.'
    },
    en: {
      title: 'Pulmonary Function Tests (Spirometry)',
      description: 'Accurate assessment of lung capacity and function through spirometry for correct diagnosis of diseases and monitoring treatment progress.'
    }
  },
  ildFibrosis: {
    fa: {
      title: 'بیماری‌های بینابینی ریه و فیبروز ریوی',
      description: 'رویکرد تخصصی در تشخیص و مدیریت بیماری‌های پیچیده ریوی مانند فیبروز، با هدف کند کردن روند بیماری و حفظ عملکرد تنفسی.'
    },
    en: {
      title: 'Interstitial Lung Diseases and Pulmonary Fibrosis',
      description: 'A specialized approach in the diagnosis and management of complex lung diseases such as fibrosis, aiming to slow disease progression and maintain respiratory function.'
    }
  },
  sleepApnea: {
    fa: {
      title: 'اختلالات تنفسی مرتبط با خواب (آپنه خواب)',
      description: 'بررسی و درمان وقفه تنفسی در خواب (آپنه) برای بهبود کیفیت خواب، کاهش خستگی روزانه و پیشگیری از عوارض قلبی-عروقی.'
    },
    en: {
      title: 'Sleep-Related Breathing Disorders (Sleep Apnea)',
      description: 'Evaluation and treatment of sleep apnea to improve sleep quality, reduce daytime fatigue, and prevent cardiovascular complications.'
    }
  },
  cancerScreening: {
    fa: {
      title: 'تشخیص زودهنگام و غربالگری سرطان ریه',
      description: 'ارائه خدمات غربالگری برای افراد در معرض خطر و تشخیص مراحل اولیه سرطان ریه با بهره‌گیری از متدهای نوین جهت افزایش شانس موفقیت درمان.'
    },
    en: {
      title: 'Early Detection and Screening for Lung Cancer',
      description: 'Providing screening services for at-risk individuals and diagnosing early-stage lung cancer using modern methods to increase the chances of successful treatment.'
    }
  },
  consultation: {
    fa: {
      title: 'مشاوره تخصصی ریه (نظر دوم)',
      description: 'ارائه مشاوره قبل از عمل‌های جراحی سنگین، بررسی تخصصی پرونده‌های پزشکی پیچیده (نظر دوم) و راهنمایی بیماران جهت انتخاب بهترین مسیر درمانی.'
    },
    en: {
      title: 'Specialized Pulmonary Consultation (Second Opinion)',
      description: 'Providing consultation before major surgeries, specialized review of complex medical records (second opinion), and guiding patients to choose the best treatment path.'
    }
  }
}

const blogPosts = [
  {
    slug: 'bronchitis-treatment',
    image: '/images/blogs/lung-microscopy.png',
    fa: {
      title: 'برونشیت چیست و چگونه درمان می‌شود؟',
      description: 'برونشیت، التهاب لوله‌های برونش در ریه‌ها، یکی از شایع‌ترین علل سرفه است. در این مقاله به بررسی علائم، دلایل و جدیدترین روش‌های درمانی آن می‌پردازیم.'
    },
    en: {
      title: 'What Is Bronchitis and How Is It Treated?',
      description: 'Bronchitis, the inflammation of the bronchial tubes in the lungs, is one of the most common causes of coughing. This article explores its symptoms, causes, and the latest treatment methods.'
    }
  },
  {
    slug: 'managing-asthma',
    image: '/images/blogs/respiratory-spray-noun.png',
    fa: {
      title: '۵ راهکار کلیدی برای مدیریت و کنترل آسم',
      description: 'زندگی با آسم می‌تواند چالش‌برانگیز باشد، اما با راهکارهای صحیح می‌توان آن را به خوبی کنترل کرد. این مقاله به شما نکات عملی برای بهبود کیفیت زندگی را آموزش می‌دهد.'
    },
    en: {
      title: '5 Key Strategies for Managing and Controlling Asthma',
      description: 'Living with asthma can be challenging, but with the right strategies it can be well-managed. This article offers practical tips to improve your quality of life.'
    }
  },
  {
    slug: 'long-covid-respiratory-effects',
    image: '/images/blogs/coronavirus.png',
    fa: {
      title: 'اثرات تنفسی کووید طولانی مدت (Long COVID)',
      description: 'بسیاری از بهبودیافتگان کرونا همچنان با عوارض تنفسی دست و پنجه نرم می‌کنند. در این مطلب، به بررسی علائم و رویکردهای درمانی برای لانگ کووید می‌پردازیم.'
    },
    en: {
      title: 'Respiratory Effects of Long COVID',
      description: 'Many COVID-19 survivors still struggle with respiratory complications. This article reviews symptoms and treatment approaches for Long COVID.'
    }
  },
  {
    slug: 'quitting-smoking-benefits',
    image: '/images/blogs/quitting-smoking.png',
    fa: {
      title: 'ترک سیگار: بهترین هدیه به ریه‌های شما',
      description: 'ترک سیگار فرآیندی است که فواید بی‌شماری برای سلامت ریه‌ها و کل بدن دارد. با مراحل و نکات کلیدی برای موفقیت در این مسیر آشنا شوید.'
    },
    en: {
      title: 'Quitting Smoking: The Best Gift to Your Lungs',
      description: 'Quitting smoking provides countless health benefits for your lungs and entire body. Learn the key steps and tips for success on this journey.'
    }
  }
]

interface AparatVideo {
  title: string
  hash: string
  section: 'medical' | 'patient'
  categorySlug: string
}

const aparatVideos: AparatVideo[] = [
  { title: 'آموزش ونتیلاتور به زبان ساده', hash: '3iO4p', section: 'medical', categorySlug: 'ventilator' },
  { title: 'آموزش ونتیلاتور به زبان ساده (قسمت دوم)', hash: '76Cw8', section: 'medical', categorySlug: 'ventilator' },
  { title: 'آموزش ونتیلاتور به زبان ساده (قسمت سوم)', hash: 'GnOx0', section: 'medical', categorySlug: 'ventilator' },
  { title: 'آموزش ونتیلاتور به زبان ساده (قسمت چهارم)', hash: 'MRV3d', section: 'medical', categorySlug: 'ventilator' },
  { title: 'آموزش ونتیلاتور به زبان ساده (قسمت پنجم)', hash: 'Ebfac', section: 'medical', categorySlug: 'ventilator' },
  { title: 'آموزش ونتیلاتور به زبان ساده (قسمت ششم)', hash: 'zdZut', section: 'medical', categorySlug: 'ventilator' },
  { title: 'آموزش ونتیلاتور به زبان ساده (قسمت هفتم)', hash: 'MDIdT', section: 'medical', categorySlug: 'ventilator' },
  { title: 'آموزش ونتیلاتور به زبان ساده (قسمت هشتم)', hash: 'PoV9y', section: 'medical', categorySlug: 'ventilator' },
  { title: 'آموزش ونتیلاتور به زبان ساده (قسمت نهم + WEANING)', hash: 'cAVmT', section: 'medical', categorySlug: 'ventilator' },
  { title: 'تهویه مکانیکی غیر تهاجمی به زبان ساده', hash: 'TZb9Q', section: 'medical', categorySlug: 'non-invasive-ventilation' },
  { title: 'آموزش CXR به زبان ساده (قسمت اول)', hash: 'Tcoda', section: 'medical', categorySlug: 'cxr' },
  { title: 'آموزش CXR به زبان ساده (قسمت دوم)', hash: 'We6JT', section: 'medical', categorySlug: 'cxr' },
  { title: 'آموزش CXR به زبان ساده (قسمت سوم)', hash: 'P1FNW', section: 'medical', categorySlug: 'cxr' },
  { title: 'آموزش CT قفسه سینه به زبان ساده (قسمت اول)', hash: 'LYc06', section: 'medical', categorySlug: 'chest-ct' },
  { title: 'آموزش CT قفسه سینه به زبان ساده (قسمت دوم)', hash: 'SjXxa', section: 'medical', categorySlug: 'chest-ct' },
  { title: 'آموزش CT قفسه سینه به زبان ساده (قسمت سوم)', hash: '7Axt2', section: 'medical', categorySlug: 'chest-ct' },
  { title: 'آموزش مصرف صحیح دارو', hash: '9E4dg', section: 'patient', categorySlug: 'medication' },
  { title: 'آموزش تفسیر اسپیرومتری', hash: '836Gy', section: 'medical', categorySlug: 'spirometry' },
  { title: 'آسم و COPD - قسمت اول', hash: 'LrDUJ', section: 'patient', categorySlug: 'asthma-copd' },
  { title: 'آسم و COPD - قسمت دوم', hash: 'qdo6M', section: 'patient', categorySlug: 'asthma-copd' },
  { title: 'آسم و COPD - قسمت سوم', hash: '6Z25q', section: 'patient', categorySlug: 'asthma-copd' },
  { title: 'آسم و COPD - قسمت چهارم', hash: 'gtIcp', section: 'patient', categorySlug: 'asthma-copd' },
  { title: 'برخورد با بیمار مشکوک به Covid-19 برای پزشکان عمومی', hash: '6TYIF', section: 'medical', categorySlug: 'covid-19' },
  { title: 'برخورد با بیمار مشکوک به Covid-19 برای پزشکان عمومی', hash: 'UoX3D', section: 'medical', categorySlug: 'covid-19' },
  { title: 'مدیریت بیماران Covid-19 با ARDS', hash: 'twhVB', section: 'medical', categorySlug: 'ards' },
  { title: 'مدیریت بیماران Covid-19 با ARDS - قسمت دوم', hash: '0iLBx', section: 'medical', categorySlug: 'ards' },
  { title: 'مدیریت بیماران Covid-19 با ARDS - قسمت سوم', hash: '7s1ID', section: 'medical', categorySlug: 'ards' },
  { title: 'مدیریت بیماران Covid-19 با ARDS - قسمت چهارم', hash: 'jWQti', section: 'medical', categorySlug: 'ards' },
  { title: 'مدیریت بیماران Covid-19 با ARDS - قسمت پنجم', hash: 'GCx2o', section: 'medical', categorySlug: 'ards' },
  { title: 'مدیریت بیماران Covid-19 با ARDS - قسمت ششم', hash: 'kKYQr', section: 'medical', categorySlug: 'ards' },
  { title: 'مدیریت بیماران Covid-19 با ARDS - قسمت هفتم', hash: 'BSgQa', section: 'medical', categorySlug: 'ards' }
]

const categoryDefs = [
  { section: 'blog' as const, slug: 'respiratory-health', nameFa: 'سلامت تنفسی', nameEn: 'Respiratory Health' },
  { section: 'medical' as const, slug: 'ventilator', nameFa: 'آموزش ونتیلاتور', nameEn: 'Ventilator Education' },
  { section: 'medical' as const, slug: 'non-invasive-ventilation', nameFa: 'تهویه غیرتهاجمی', nameEn: 'Non-Invasive Ventilation' },
  { section: 'medical' as const, slug: 'cxr', nameFa: 'آموزش CXR', nameEn: 'CXR Education' },
  { section: 'medical' as const, slug: 'chest-ct', nameFa: 'آموزش CT قفسه سینه', nameEn: 'Chest CT Education' },
  { section: 'medical' as const, slug: 'spirometry', nameFa: 'تفسیر اسپیرومتری', nameEn: 'Spirometry Interpretation' },
  { section: 'medical' as const, slug: 'covid-19', nameFa: 'Covid-19 برای پزشکان', nameEn: 'Covid-19 for Physicians' },
  { section: 'medical' as const, slug: 'ards', nameFa: 'مدیریت ARDS', nameEn: 'ARDS Management' },
  { section: 'patient' as const, slug: 'medication', nameFa: 'مصرف صحیح دارو', nameEn: 'Proper Medication Use' },
  { section: 'patient' as const, slug: 'asthma-copd', nameFa: 'آسم و COPD', nameEn: 'Asthma & COPD' },
  { section: 'faq' as const, slug: 'services-treatment', nameFa: 'خدمات و روند درمان', nameEn: 'Services & Treatment' },
  { section: 'faq' as const, slug: 'appointments', nameFa: 'نوبت‌دهی و زمان‌بندی', nameEn: 'Appointments & Scheduling' }
]

const faqData = [
  {
    categorySlug: 'services-treatment',
    faqs: [
      {
        questionFa: 'چه خدماتی در کلینیک ارائه می‌شود؟',
        questionEn: 'What services are offered at the clinic?',
        answerFa: 'کلینیک تنفس دکتر سامی خدمات تخصصی در زمینه تشخیص و درمان بیماری‌های ریوی و تنفسی ارائه می‌دهد؛ از جمله آسم و آلرژی، بیماری‌های مزمن انسدادی ریه (COPD)، آپنه خواب، فیبروز ریوی (ILD)، غربالگری سرطان ریه، برونکوسکوپی و انجام تست‌های عملکرد ریه مانند اسپیرومتری.',
        answerEn: 'Dr. Sami\'s respiratory clinic offers specialized services for the diagnosis and treatment of pulmonary and respiratory diseases, including asthma and allergies, COPD, sleep apnea, ILD, lung cancer screening, bronchoscopy, and pulmonary function tests such as spirometry.'
      },
      {
        questionFa: 'روند مراجعه و درمان چگونه است؟',
        questionEn: 'What is the visit and treatment process?',
        answerFa: 'برای شروع کافیست از طریق صفحه نوبت‌دهی یا تماس تلفنی وقت خود را رزرو کنید. در ویزیت اول، معاینه تخصصی و بررسی شرح حال انجام می‌شود و در صورت لزوم، آزمایش‌های تنفسی و تصویربرداری درخواست می‌شود.',
        answerEn: 'To get started, book an appointment through the appointment page or by phone. During the first visit, a specialized examination and medical history review are performed, and if necessary, respiratory tests and imaging are requested.'
      },
      {
        questionFa: 'آیا امکان مشاوره آنلاین دارید؟',
        questionEn: 'Do you offer online consultations?',
        answerFa: 'بله، مشاوره‌های آنلاین برای بیماران خارج از تهران یا موارد پیگیری فراهم است. شما می‌توانید مدارک، آزمایش‌ها و گزارش‌های تصویربرداری خود را پیش از جلسه بارگذاری کنید.',
        answerEn: 'Yes, online consultations are available for patients outside Tehran or for follow-up cases. You can upload your documents, lab results, and imaging reports before the session.'
      },
      {
        questionFa: 'آیا کودکان هم در کلینیک ویزیت می‌شوند؟',
        questionEn: 'Are children also seen at the clinic?',
        answerFa: 'بله، خدمات تشخیص و درمان آسم و آلرژی‌های تنفسی برای کودکان و بزرگسالان ارائه می‌شود.',
        answerEn: 'Yes, diagnostic and treatment services for asthma and respiratory allergies are provided for both children and adults.'
      }
    ]
  },
  {
    categorySlug: 'appointments',
    faqs: [
      {
        questionFa: 'چگونه می‌توانم نوبت بگیرم؟',
        questionEn: 'How can I book an appointment?',
        answerFa: 'از طریق صفحه نوبت‌دهی اینترنتی در سایت یا تماس با مطب می‌توانید نوبت خود را رزرو کنید.',
        answerEn: 'You can book your appointment through the online appointment page on the website or by calling the clinic.'
      },
      {
        questionFa: 'ساعات کاری مطب چیست؟',
        questionEn: 'What are the clinic hours?',
        answerFa: 'ساعت کاری دکتر از ۷ تا ۱۹ شنبه تا چهارشنبه است.',
        answerEn: 'The doctor\'s working hours are from 7 AM to 7 PM, Saturday through Wednesday.'
      },
      {
        questionFa: 'آیا امکان لغو یا تغییر نوبت وجود دارد؟',
        questionEn: 'Can I cancel or reschedule my appointment?',
        answerFa: 'بله، از طریق همان پلتفرمی که نوبت را رزرو کرده‌اید می‌توانید نوبت خود را لغو یا تغییر دهید.',
        answerEn: 'Yes, you can cancel or reschedule your appointment through the same platform where you booked it.'
      },
      {
        questionFa: 'چه مدارکی باید همراه داشته باشم؟',
        questionEn: 'What documents should I bring?',
        answerFa: 'لطفاً کارت ملی، بیمه درمانی (در صورت وجود)، نتایج آزمایش‌ها و تصویربرداری‌های قبلی و لیست داروهای مصرفی خود را همراه داشته باشید.',
        answerEn: 'Please bring your ID, health insurance (if applicable), previous lab results and imaging, and a list of your current medications.'
      }
    ]
  }
]

function translateVideoTitle(title: string): string {
  const translations: Record<string, string> = {
    'آموزش ونتیلاتور به زبان ساده': 'Ventilator Education Made Simple',
    'تهویه مکانیکی غیر تهاجمی به زبان ساده': 'Non-Invasive Mechanical Ventilation Made Simple',
    'آموزش CXR به زبان ساده': 'CXR Education Made Simple',
    'آموزش CT قفسه سینه به زبان ساده': 'Chest CT Education Made Simple',
    'آموزش مصرف صحیح دارو': 'Proper Medication Use',
    'آموزش تفسیر اسپیرومتری': 'Spirometry Interpretation',
    'آسم و COPD': 'Asthma & COPD',
    'برخورد با بیمار مشکوک به Covid-19 برای پزشکان عمومی': 'Managing Suspected Covid-19 Patients for GPs',
    'مدیریت بیماران Covid-19 با ARDS': 'Managing Covid-19 Patients with ARDS'
  }

  for (const [fa, en] of Object.entries(translations)) {
    if (title.startsWith(fa)) {
      return title.replace(fa, en)
    }
  }
  return title
}

export async function seedDatabase() {
  const db = useDb()

  const [userCount] = await db.select({ count: count() }).from(users)
  if (userCount.count > 0) {
    return
  }

  const passwordHash = await hashPassword('1022')
  await db.insert(users).values({
    username: 'raminsami',
    passwordHash
  })

  const categoryMap = new Map<string, number>()
  for (let i = 0; i < categoryDefs.length; i++) {
    const cat = categoryDefs[i]
    const [inserted] = await db.insert(categories).values({
      section: cat.section,
      nameFa: cat.nameFa,
      nameEn: cat.nameEn,
      slug: cat.slug,
      sortOrder: i
    }).returning()
    categoryMap.set(`${cat.section}:${cat.slug}`, inserted.id)
  }

  for (const service of legacyServices) {
    const trans = serviceTranslations[service.key]
    await db.insert(posts).values({
      section: 'service',
      slug: service.slug,
      titleFa: trans.fa.title,
      titleEn: trans.en.title,
      descriptionFa: trans.fa.description,
      descriptionEn: trans.en.description,
      image: service.image,
      videoUrl: DEFAULT_VIDEO
    })
  }

  const blogCategoryId = categoryMap.get('blog:respiratory-health')
  for (const post of blogPosts) {
    await db.insert(posts).values({
      section: 'blog',
      slug: post.slug,
      titleFa: post.fa.title,
      titleEn: post.en.title,
      descriptionFa: post.fa.description,
      descriptionEn: post.en.description,
      image: post.image,
      videoUrl: DEFAULT_VIDEO,
      categoryId: blogCategoryId
    })
  }

  for (let i = 0; i < aparatVideos.length; i++) {
    const video = aparatVideos[i]
    const categoryId = categoryMap.get(`${video.section}:${video.categorySlug}`)
    const slug = `${video.categorySlug}-${video.hash.toLowerCase()}`
    await db.insert(posts).values({
      section: video.section,
      slug,
      titleFa: video.title,
      titleEn: translateVideoTitle(video.title),
      descriptionFa: `ویدیوی آموزشی: ${video.title}. این ویدیو توسط دکتر رامین سامی تهیه شده است.`,
      descriptionEn: `Educational video: ${translateVideoTitle(video.title)}. This video was prepared by Dr. Ramin Sami.`,
      image: '/images/services/spirometry.png',
      videoUrl: `https://www.aparat.com/video/video/embed/videohash/${video.hash}/vt/frame`,
      categoryId,
      publishedAt: new Date(Date.now() - i * 86400000).toISOString()
    })
  }

  for (const faqGroup of faqData) {
    const categoryId = categoryMap.get(`faq:${faqGroup.categorySlug}`)
    if (!categoryId) continue
    for (let i = 0; i < faqGroup.faqs.length; i++) {
      const faq = faqGroup.faqs[i]
      await db.insert(faqs).values({
        categoryId,
        questionFa: faq.questionFa,
        questionEn: faq.questionEn,
        answerFa: faq.answerFa,
        answerEn: faq.answerEn,
        sortOrder: i
      })
    }
  }

  console.log('[db] Seed data inserted successfully')
}
