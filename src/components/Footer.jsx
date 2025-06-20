function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">İletişim</h3>
            <p className="text-gray-400">Adres: [Şirket Adresi]</p>
            <p className="text-gray-400">Telefon: [Telefon Numarası]</p>
            <p className="text-gray-400">E-posta: [E-posta Adresi]</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Ana Sayfa</a></li>
              <li><a href="/products" className="text-gray-400 hover:text-white transition-colors">Ürünler</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Çalışma Saatleri</h3>
            <p className="text-gray-400">Pazartesi - Cuma: 09:00 - 18:00</p>
            <p className="text-gray-400">Cumartesi: 09:00 - 13:00</p>
            <p className="text-gray-400">Pazar: Kapalı</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} MB Disli. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 