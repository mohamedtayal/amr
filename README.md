# صدقة جارية | عمرو العيسوي

موقع إلكتروني تذكاري للمرحوم عمرو العيسوي - رحمه الله

## إعداد النطاق المخصص (Custom Domain)

لإعداد نطاق مخصص لهذا الموقع:

### 1. تحديث ملف CNAME

قم بتحديث ملف `CNAME` في جذر المشروع واستبدال `amr.example.com` بنطاقك الفعلي:

```
your-domain.com
```

### 2. تحديث Open Graph URL

في ملف `index.html`، قم بتحديث meta tag الخاص بـ Open Graph:

```html
<meta property="og:url" content="https://your-domain.com">
```

### 3. إعداد DNS

في إعدادات مزود النطاق الخاص بك، أضف أحد الإعدادات التالية:

#### للنطاق الرئيسي (مثل: example.com)
أضف سجلات A التالية:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

#### للنطاق الفرعي (مثل: amr.example.com)
أضف سجل CNAME:
```
CNAME: your-username.github.io
```

### 4. تفعيل Custom Domain في GitHub

1. اذهب إلى إعدادات المستودع (Repository Settings)
2. انتقل إلى قسم "Pages"
3. أدخل النطاق المخصص في حقل "Custom domain"
4. فعّل "Enforce HTTPS" بعد التحقق من النطاق

## المميزات

- سبحة إلكترونية
- أدعية متعددة للميت
- مشاركة عبر واتساب
- وضع فاتح وداكن
- تصميم متجاوب

## تقنيات المشروع

- HTML5
- CSS3 (مع Glass Morphism)
- JavaScript (Vanilla)
- AOS Animation Library
- Google Fonts (Cairo & Amiri)

---

رحم الله المرحوم عمرو العيسوي وجعل هذا العمل في ميزان حسناته
