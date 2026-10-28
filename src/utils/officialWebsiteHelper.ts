import { BlogPost } from '../types';

export function ensureOfficialWebsite(post: BlogPost): BlogPost {
  if (post.officialWebsite && post.officialWebsite.url) {
    return post;
  }
  const titleLower = (post.title || '').toLowerCase();
  const subLower = (post.subtitle || '').toLowerCase();
  const combined = `${titleLower} ${subLower}`;
  const cat = post.jobCategory || post.category;

  let name = 'आधिकारिक सरकारी भर्ती बोर्ड';
  let url = 'https://www.sarkariresult.com/';
  let desc = 'भर्ती परीक्षा, परिणाम, उत्तर कुंजी व आधिकारिक अधिसूचना संबंधी सत्यापन हेतु अधिकृत सरकारी पोर्टल';

  if (combined.includes('police') || combined.includes('पुलिस') || combined.includes('upprpb') || combined.includes('constable')) {
    name = 'उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड (UPPRPB)';
    url = 'https://uppbpb.gov.in/';
    desc = 'उत्तर प्रदेश पुलिस आरक्षी एवं सब-इंस्पेक्टर भर्ती आधिकारिक पोर्टल';
  } else if (combined.includes('rajasthan') || combined.includes('rajasthanvacancy') || combined.includes('rsmssb') || combined.includes('cet') || combined.includes('patwari') || combined.includes('पटवारी') || combined.includes('राजस्थान') || combined.includes('ldc')) {
    name = 'राजस्थान कर्मचारी चयन बोर्ड (RSMSSB) / SSO Rajasthan';
    url = 'https://rsmssb.rajasthan.gov.in/';
    desc = 'राजस्थान कर्मचारी चयन बोर्ड, जयपुर एवं SSO परीक्षा पोर्टल';
  } else if (combined.includes('ssc') || combined.includes('cgl') || combined.includes('chsl') || combined.includes('mts') || combined.includes('gd')) {
    name = 'कर्मचारी चयन आयोग (Staff Selection Commission - SSC)';
    url = 'https://ssc.gov.in/';
    desc = 'भारत सरकार कर्मचारी चयन आयोग आधिकारिक पोर्टल';
  } else if (combined.includes('upsc') || combined.includes('civil services') || combined.includes('ias') || combined.includes('ifs')) {
    name = 'संघ लोक सेवा आयोग (UPSC)';
    url = 'https://upsc.gov.in/';
    desc = 'संघ लोक सेवा आयोग (UPSC) सिविल सेवा आधिकारिक पोर्टल';
  } else if (combined.includes('railway') || combined.includes('rrb') || combined.includes('ntpc') || combined.includes('alp') || combined.includes('technician') || combined.includes('रेलवे')) {
    name = 'रेल मंत्रालय एवं रेलवे भर्ती बोर्ड (RRB)';
    url = 'https://indianrailways.gov.in/';
    desc = 'Ministry of Railways & Centralized RRB Recruitment Portal';
  } else if (combined.includes('bank') || combined.includes('sbi') || combined.includes('ibps') || combined.includes('po') || combined.includes('clerk')) {
    name = 'इंस्टीट्यूट ऑफ बैंकिंग पर्सनेल सेलेक्शन (IBPS) / SBI Careers';
    url = 'https://www.ibps.in/';
    desc = 'Institute of Banking Personnel Selection & SBI Official Portal';
  } else if (combined.includes('ctet') || combined.includes('teacher') || combined.includes('teaching') || combined.includes('शिक्षक') || combined.includes('tet')) {
    name = 'केंद्रीय शिक्षक पात्रता परीक्षा (CTET / CBSE)';
    url = 'https://ctet.nic.in/';
    desc = 'केंद्रीय माध्यमिक शिक्षा बोर्ड (CBSE) CTET आधिकारिक पोर्टल';
  } else if (combined.includes('defense') || combined.includes('army') || combined.includes('navy') || combined.includes('airforce') || combined.includes('agniveer') || combined.includes('अग्निवीर')) {
    name = 'भारतीय सेना / रक्षा मंत्रालय भर्ती बोर्ड';
    url = 'https://joinindianarmy.nic.in/';
    desc = 'Join Indian Army / Navy / Air Force Official Recruitment Portal';
  } else if (cat === 'UPSC') {
    name = 'संघ लोक सेवा आयोग (UPSC)';
    url = 'https://upsc.gov.in/';
    desc = 'Union Public Service Commission Official Portal';
  } else if (cat === 'SSC') {
    name = 'कर्मचारी चयन आयोग (SSC)';
    url = 'https://ssc.gov.in/';
    desc = 'Staff Selection Commission Official Portal';
  } else if (cat === 'Banking') {
    name = 'बैंकिंग कार्मिक चयन संस्थान (IBPS)';
    url = 'https://www.ibps.in/';
    desc = 'IBPS & Banking Recruitment Portal';
  } else if (cat === 'Railways') {
    name = 'रेलवे भर्ती बोर्ड (RRB)';
    url = 'https://indianrailways.gov.in/';
    desc = 'Indian Railways Recruitment Portal';
  } else if (cat === 'Teaching') {
    name = 'केंद्रीय शिक्षक पात्रता परीक्षा (CTET)';
    url = 'https://ctet.nic.in/';
    desc = 'Teaching Eligibility Test Portal';
  } else if (cat === 'Defense') {
    name = 'भारतीय रक्षा मंत्रालय भर्ती बोर्ड';
    url = 'https://joinindianarmy.nic.in/';
    desc = 'Defense Recruitment Portal';
  }

  return {
    ...post,
    officialWebsite: {
      name,
      url,
      portalDescription: desc,
    },
    officialUrl: url,
  };
}
