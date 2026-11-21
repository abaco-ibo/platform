import React, { useState, useEffect, useMemo } from 'react';
import {
  Package,
  ShoppingCart,
  ArrowRightLeft,
  History,
  TrendingUp,
  Bell,
  Plus,
  Search,
  Download,
  Edit,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  LogOut,
  ChevronRight,
  Info,
  Building,
  DollarSign,
  Boxes,
  FileText,
  Check,
  X,
  ArrowUpRight,
  ArrowDownLeft,
  Repeat,
  ShieldCheck,
  Tag
} from 'lucide-react';

// ==========================================
// DATOS INICIALES Y CONSTANTES DE NEGOCIO
// ==========================================

const INITIAL_USER = {
  id: 1,
  nombre_alias: 'Mariana Rojas',
  email: 'mariana@distribuidoraraiz.co',
  nombre_negocio: 'Distribuidora Raíz',
  ciudad: 'Bogotá, Colombia',
  bodega: 'Bodega principal'
};

const INITIAL_PARTNERS = [
  { id: 101, nombre_alias: 'Laura Méndez', email: 'laura@reddistribuidores.co', negocio: 'BioVida Laura' },
  { id: 102, nombre_alias: 'Andrés Vega', email: 'andres@reddistribuidores.co', negocio: 'Distribuidora Vega' },
  { id: 103, nombre_alias: 'Camila Torres', email: 'camila@reddistribuidores.co', negocio: 'Camila EcoShop' }
];

const INITIAL_PRODUCTS = [
  {
    id: 1,
    codigo_sku: 'CP-001',
    nombre: 'Jabón botánico',
    categoria: 'Cuidado personal',
    unidad_medida: '120 g',
    costo_adquisicion: 8000,
    precio_publico: 14000,
    stock_actual: 44,
    stock_retenido: 0,
    stock_minimo: 20,
    activo: true
  },
  {
    id: 2,
    codigo_sku: 'CP-002',
    nombre: 'Champú herbal',
    categoria: 'Cuidado personal',
    unidad_medida: '250 ml',
    costo_adquisicion: 12000,
    precio_publico: 22000,
    stock_actual: 12,
    stock_retenido: 5,
    stock_minimo: 12,
    activo: true
  },
  {
    id: 3,
    codigo_sku: 'CP-003',
    nombre: 'Aceite esencial lavender',
    categoria: 'Bienestar',
    unidad_medida: '30 ml',
    costo_adquisicion: 18000,
    precio_publico: 32000,
    stock_actual: 8,
    stock_retenido: 0,
    stock_minimo: 10,
    activo: true
  },
  {
    id: 4,
    codigo_sku: 'IB-001',
    nombre: 'Infusión bienestar',
    categoria: 'Bienestar',
    unidad_medida: 'Caja x 20 sachet',
    costo_adquisicion: 9000,
    precio_publico: 16000,
    stock_actual: 26,
    stock_retenido: 0,
    stock_minimo: 15,
    activo: true
  },
  {
    id: 5,
    codigo_sku: 'HG-001',
    nombre: 'Limpiador multiusos eco',
    categoria: 'Hogar',
    unidad_medida: '500 ml',
    costo_adquisicion: 7500,
    precio_publico: 13500,
    stock_actual: 30,
    stock_retenido: 0,
    stock_minimo: 10,
    activo: true
  },
  {
    id: 6,
    codigo_sku: 'CP-004',
    nombre: 'Crema facial nutritiva',
    categoria: 'Cuidado personal',
    unidad_medida: '50 g',
    costo_adquisicion: 15000,
    precio_publico: 28000,
    stock_actual: 18,
    stock_retenido: 0,
    stock_minimo: 8,
    activo: true
  }
];

const INITIAL_MOVEMENTS = [
  {
    id: 1001,
    codigo: 'COMPRA',
    tipo_nombre: 'Compra de inventario',
    id_producto: 1,
    cantidad: 50,
    precio_unitario: 8000,
    monto_total: 400000,
    fecha_registro: '2026-11-01T09:00:00Z',
    efecto: 1,
    observaciones: 'Lote inicial de compra a proveedor Raíz Verde'
  },
  {
    id: 1002,
    codigo: 'VENTA',
    tipo_nombre: 'Venta a cliente final',
    id_producto: 1,
    cantidad: 6,
    precio_unitario: 14000,
    monto_total: 84000,
    alias_cliente: 'Carlos - Charcutería',
    notas_cliente: 'Prefiere entregas los viernes en la tarde',
    fecha_registro: '2026-11-05T14:30:00Z',
    efecto: -1
  },
  {
    id: 1003,
    codigo: 'VENTA',
    tipo_nombre: 'Venta a cliente final',
    id_producto: 4,
    cantidad: 14,
    precio_unitario: 16000,
    monto_total: 224000,
    alias_cliente: 'EcoTienda Chapinero',
    fecha_registro: '2026-11-10T11:15:00Z',
    efecto: -1
  },
  {
    id: 1004,
    codigo: 'AUTOCONSUMO',
    tipo_nombre: 'Autoconsumo / Muestra',
    id_producto: 3,
    cantidad: 2,
    precio_unitario: 18000,
    monto_total: 36000,
    fecha_registro: '2026-11-12T16:00:00Z',
    efecto: -1,
    observaciones: 'Muestras entregadas en feria orgánica'
  },
  {
    id: 1005,
    codigo: 'PRESTAMO_ENVIADO',
    tipo_nombre: 'Préstamo a socio',
    id_producto: 4,
    cantidad: 7,
    precio_unitario: 9000,
    monto_total: 63000,
    id_socio: 101,
    socio_nombre: 'Laura Méndez',
    modalidad_retorno: 'PRODUCTO',
    estado_cesion: 'ACEPTADA',
    fecha_registro: '2026-11-14T10:00:00Z',
    efecto: -1
  },
  {
    id: 1006,
    codigo: 'PRESTAMO_ENVIADO',
    tipo_nombre: 'Préstamo a socio',
    id_producto: 6,
    cantidad: 5,
    precio_unitario: 15000,
    monto_total: 75000,
    id_socio: 103,
    socio_nombre: 'Camila Torres',
    modalidad_retorno: 'DINERO',
    monto_pactado_devolucion: 75000,
    estado_cesion: 'ACEPTADA',
    fecha_registro: '2026-11-16T15:45:00Z',
    efecto: -1
  },
  {
    id: 1007,
    codigo: 'PRESTAMO_ENVIADO',
    tipo_nombre: 'Préstamo a socio',
    id_producto: 2,
    cantidad: 5,
    precio_unitario: 12000,
    monto_total: 60000,
    id_socio: 102,
    socio_nombre: 'Andrés Vega',
    modalidad_retorno: 'PRODUCTO',
    estado_cesion: 'PENDIENTE',
    fecha_registro: '2026-11-19T08:30:00Z',
    efecto: 0
  },
  {
    id: 1008,
    codigo: 'VENTA',
    tipo_nombre: 'Venta a cliente final',
    id_producto: 2,
    cantidad: 10,
    precio_unitario: 22000,
    monto_total: 220000,
    alias_cliente: 'Supermercado Bio',
    fecha_registro: '2026-11-18T17:20:00Z',
    efecto: -1
  },
  {
    id: 1009,
    codigo: 'VENTA',
    tipo_nombre: 'Venta a cliente final',
    id_producto: 5,
    cantidad: 15,
    precio_unitario: 13500,
    monto_total: 202500,
    alias_cliente: 'Restaurante Verde',
    fecha_registro: '2026-11-19T12:00:00Z',
    efecto: -1
  },
  {
    id: 1010,
    codigo: 'VENTA',
    tipo_nombre: 'Venta a cliente final',
    id_producto: 1,
    cantidad: 20,
    precio_unitario: 14000,
    monto_total: 280000,
    alias_cliente: 'Hotel Boutique Natura',
    fecha_registro: '2026-11-20T10:00:00Z',
    efecto: -1
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 501,
    id_usuario_origen: 101,
    origen_nombre: 'Laura Méndez',
    tipo: 'SOLICITUD_CESION',
    codigo_sku: 'CP-005',
    producto_nombre: 'Sérum capilar botánico',
    categoria: 'Cuidado personal',
    unidad_medida: '50 ml',
    costo_adquisicion: 16000,
    precio_publico: 29000,
    cantidad: 10,
    modalidad_retorno: 'PRODUCTO',
    mensaje: 'Laura Méndez te envía 10 unidades de "Sérum capilar botánico" en modalidad de Préstamo retornable en producto.',
    leida: false,
    fecha: '2026-11-20T11:00:00Z'
  }
];

// Formateador de moneda COP
const formatCOP = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(amount || 0);
};

// ==========================================
// COMPONENTE PRINCIPAL DE LA APLICACIÓN
// ==========================================

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('abaco_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('abaco_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [movements, setMovements] = useState(() => {
    try {
      const saved = localStorage.getItem('abaco_movements');
      return saved ? JSON.parse(saved) : INITIAL_MOVEMENTS;
    } catch {
      return INITIAL_MOVEMENTS;
    }
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('abaco_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [partners] = useState(INITIAL_PARTNERS);

  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      if (user) localStorage.setItem('abaco_user', JSON.stringify(user));
      else localStorage.removeItem('abaco_user');
    } catch {
      // Ignorar si localStorage está restringido
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('abaco_products', JSON.stringify(products));
    } catch {
      // Ignorar si localStorage está restringido
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('abaco_movements', JSON.stringify(movements));
    } catch {
      // Ignorar si localStorage está restringido
    }
  }, [movements]);

  useEffect(() => {
    try {
      localStorage.setItem('abaco_notifications', JSON.stringify(notifications));
    } catch {
      // Ignorar si localStorage está restringido
    }
  }, [notifications]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleResetDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setMovements(INITIAL_MOVEMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    showToast('Datos demo restaurados exitosamente', 'info');
  };

  const handleSimulateIncomingTransfer = () => {
    const newNotif = {
      id: Date.now(),
      id_usuario_origen: 103,
      origen_nombre: 'Camila Torres',
      tipo: 'SOLICITUD_CESION',
      codigo_sku: 'IB-001',
      producto_nombre: 'Infusión bienestar',
      categoria: 'Bienestar',
      unidad_medida: 'Caja x 20 sachet',
      costo_adquisicion: 9000,
      precio_publico: 16000,
      cantidad: 8,
      modalidad_retorno: 'PRODUCTO',
      mensaje: 'Camila Torres te envía 8 unidades de "Infusión bienestar" en modalidad de préstamo entre socios.',
      leida: false,
      fecha: new Date().toISOString()
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast('¡Nueva solicitud de cesión recibida de Camila Torres!', 'info');
  };

  const handleAcceptTransfer = (notif) => {
    setProducts((prevProducts) => {
      const existing = prevProducts.find((p) => p.codigo_sku === notif.codigo_sku);
      if (existing) {
        return prevProducts.map((p) =>
          p.codigo_sku === notif.codigo_sku
            ? { ...p, stock_actual: p.stock_actual + notif.cantidad }
            : p
        );
      } else {
        const newProd = {
          id: Date.now(),
          codigo_sku: notif.codigo_sku,
          nombre: notif.producto_nombre,
          categoria: notif.categoria,
          unidad_medida: notif.unidad_medida,
          costo_adquisicion: notif.costo_adquisicion,
          precio_publico: notif.precio_publico,
          stock_actual: notif.cantidad,
          stock_retenido: 0,
          stock_minimo: 5,
          activo: true
        };
        return [...prevProducts, newProd];
      }
    });

    const newMov = {
      id: Date.now(),
      codigo: 'INGRESO_POR_CESION',
      tipo_nombre: 'Ingreso por cesión/préstamo de socio',
      id_producto: products.find((p) => p.codigo_sku === notif.codigo_sku)?.id || Date.now(),
      cantidad: notif.cantidad,
      precio_unitario: notif.costo_adquisicion,
      monto_total: notif.cantidad * notif.costo_adquisicion,
      id_socio: notif.id_usuario_origen,
      socio_nombre: notif.origen_nombre,
      estado_cesion: 'ACEPTADA',
      fecha_registro: new Date().toISOString(),
      efecto: 1,
      observaciones: `Aceptada solicitud de cesión enviada por ${notif.origen_nombre}`
    };

    setMovements((prev) => [newMov, ...prev]);
    setNotifications((prev) => prev.filter((n) => n.id !== notif.id));
    showToast(`Cesión aceptada. Se sumaron +${notif.cantidad} u. a tu inventario.`);
  };

  const handleRejectTransfer = (notif) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notif.id));
    showToast('Solicitud de cesión rechazada.', 'error');
  };

  if (!user) {
    return <ViewLogin onLogin={(usr) => setUser(usr)} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col md:flex-row font-sans">
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border transition-all ${
            toastMessage.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : toastMessage.type === 'info'
              ? 'bg-blue-50 border-blue-200 text-blue-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          {toastMessage.type === 'error' ? (
            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
          ) : toastMessage.type === 'info' ? (
            <Info className="w-5 h-5 text-blue-600 shrink-0" />
          ) : (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          )}
          <span className="text-sm font-medium">{toastMessage.msg}</span>
        </div>
      )}

      {/* BARRA LATERAL (#0F172A) */}
      <aside className="w-full md:w-64 bg-[#0F172A] text-slate-300 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
            Á
          </div>
          <div>
            <h1 className="text-white font-bold tracking-tight text-lg leading-tight">ÁBACO</h1>
            <p className="text-xs text-slate-400">Gestión & Analítica</p>
          </div>
        </div>

        <div className="p-4 mx-4 my-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Building className="w-3.5 h-3.5 text-blue-400" />
            <span>Negocio activo</span>
          </div>
          <div className="text-sm font-semibold text-white truncate">{user.nombre_negocio}</div>
          <div className="text-xs text-slate-400 truncate">{user.nombre_alias}</div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          <NavItem
            id="dashboard"
            icon={TrendingUp}
            label="Resumen"
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <NavItem
            id="productos"
            icon={Package}
            label="Catálogo Productos"
            active={activeTab === 'productos'}
            onClick={() => setActiveTab('productos')}
          />
          <NavItem
            id="movimientos"
            icon={ShoppingCart}
            label="Registrar Movimiento"
            active={activeTab === 'movimientos'}
            onClick={() => setActiveTab('movimientos')}
          />
          <NavItem
            id="historial"
            icon={History}
            label="Historial & Préstamos"
            active={activeTab === 'historial'}
            onClick={() => setActiveTab('historial')}
          />
          <NavItem
            id="analitica"
            icon={FileText}
            label="Analítica & Reposición"
            active={activeTab === 'analitica'}
            onClick={() => setActiveTab('analitica')}
          />
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-3">
          <button
            onClick={handleResetDemoData}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Restaurar datos de prueba iniciales"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restaurar datos demo</span>
          </button>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-xs">
                MR
              </div>
              <div className="text-xs">
                <p className="text-white font-medium truncate max-w-[100px]">{user.nombre_alias}</p>
                <p className="text-slate-400 text-[10px]">Distribuidor</p>
              </div>
            </div>
            <button
              onClick={() => setUser(null)}
              className="p-2 text-slate-400 hover:text-rose-400 transition-colors rounded-lg hover:bg-slate-800"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ÁREA DE CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
              <span>{user.nombre_negocio}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-700 font-medium">{user.bodega}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 capitalize">
              {activeTab === 'dashboard' && 'Resumen del Negocio'}
              {activeTab === 'productos' && 'Catálogo de Productos'}
              {activeTab === 'movimientos' && 'Registrar Operación'}
              {activeTab === 'historial' && 'Historial de Transacciones'}
              {activeTab === 'analitica' && 'Analítica & Reposición'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Información al día
            </span>

            <button
              onClick={handleSimulateIncomingTransfer}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
              title="Simular recepción de cesión de otro socio para pruebas"
            >
              <ArrowDownLeft className="w-3.5 h-3.5" />
              <span>Simular solicitud socio</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotificationsDrawer(!showNotificationsDrawer)}
                className="relative p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center animate-bounce">
                    {notifications.length}
                  </span>
                )}
              </button>

              {showNotificationsDrawer && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-blue-600" />
                      <h4 className="font-bold text-slate-900 text-sm">Buzón de Solicitudes</h4>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                      {notifications.length} pendientes
                    </span>
                  </div>

                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-xs">
                      No tienes solicitudes de cesión pendientes en este momento.
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-200 transition-all text-xs"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-semibold text-slate-900">{notif.origen_nombre}</span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(notif.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-slate-600 mb-2">{notif.mensaje}</p>

                          <div className="bg-white p-2 rounded-lg border border-slate-100 mb-3 space-y-0.5">
                            <div className="font-medium text-blue-900">{notif.producto_nombre}</div>
                            <div className="text-slate-500 flex justify-between text-[11px]">
                              <span>SKU: {notif.codigo_sku}</span>
                              <span className="font-bold text-slate-800">+{notif.cantidad} u.</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAcceptTransfer(notif)}
                              className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-xs flex items-center justify-center gap-1 transition-colors"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Aceptar en bodega</span>
                            </button>
                            <button
                              onClick={() => handleRejectTransfer(notif)}
                              className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium rounded-lg text-xs flex items-center justify-center transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {activeTab === 'dashboard' && (
            <ViewDashboard
              products={products}
              movements={movements}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'productos' && (
            <ViewProducts
              products={products}
              onOpenModal={(prod) => {
                setEditingProduct(prod);
                setShowProductModal(true);
              }}
            />
          )}

          {activeTab === 'movimientos' && (
            <ViewMovements
              products={products}
              partners={partners}
              movements={movements}
              onRegisterMovement={(movData) => {
                const targetProd = products.find((p) => p.id === Number(movData.id_producto));
                if (!targetProd) return;

                const qty = Number(movData.cantidad);
                const stockDisponible = targetProd.stock_actual - targetProd.stock_retenido;
                const isOutbound = ['VENTA', 'AUTOCONSUMO', 'PRESTAMO_ENVIADO', 'CESION_DEFINITIVA_ENVIADA'].includes(movData.codigo);

                if (isOutbound && qty > stockDisponible) {
                  showToast(
                    `Operación rechazada: Stock insuficiente. Disponible: ${stockDisponible} u. (Retenido: ${targetProd.stock_retenido} u.)`,
                    'error'
                  );
                  return;
                }

                setProducts((prevProducts) =>
                  prevProducts.map((p) => {
                    if (p.id !== targetProd.id) return p;

                    if (movData.codigo === 'COMPRA') {
                      return { ...p, stock_actual: p.stock_actual + qty };
                    } else if (movData.codigo === 'VENTA' || movData.codigo === 'AUTOCONSUMO' || movData.codigo === 'CESION_DEFINITIVA_ENVIADA') {
                      return { ...p, stock_actual: p.stock_actual - qty };
                    } else if (movData.codigo === 'PRESTAMO_ENVIADO') {
                      return { ...p, stock_retenido: p.stock_retenido + qty };
                    } else if (movData.codigo === 'DEVOLUCION_PRESTAMO') {
                      return { ...p, stock_actual: p.stock_actual + qty };
                    }
                    return p;
                  })
                );

                const newMov = {
                  id: Date.now(),
                  ...movData,
                  cantidad: qty,
                  monto_total: Number(movData.monto_total),
                  fecha_registro: new Date().toISOString()
                };

                if (movData.codigo === 'DEVOLUCION_PRESTAMO' && movData.id_movimiento_ref) {
                  setMovements((prev) =>
                    prev.map((m) =>
                      m.id === Number(movData.id_movimiento_ref) ? { ...m, estado_cesion: 'COMPLETADA' } : m
                    )
                  );
                }

                setMovements((prev) => [newMov, ...prev]);
                showToast(`Operación (${movData.tipo_nombre}) registrada con éxito`);
                setActiveTab('historial');
              }}
            />
          )}

          {activeTab === 'historial' && (
            <ViewHistory
              movements={movements}
              products={products}
              onLiquidateLoan={(mov) => {
                setActiveTab('movimientos');
                showToast(`Selecciona "Devolución" en el formulario para cerrar el préstamo #${mov.id}`, 'info');
              }}
            />
          )}

          {activeTab === 'analitica' && (
            <ViewAnalytics products={products} movements={movements} />
          )}
        </div>
      </main>

      {showProductModal && (
        <ModalProduct
          editingProduct={editingProduct}
          onClose={() => {
            setShowProductModal(false);
            setEditingProduct(null);
          }}
          onSave={(data) => {
            const exists = products.some(
              (p) => p.codigo_sku.toUpperCase() === data.codigo_sku.toUpperCase() && p.id !== editingProduct?.id
            );
            if (exists) {
              showToast(`El SKU "${data.codigo_sku}" ya existe en tu catálogo.`, 'error');
              return;
            }
            setProducts((prev) => {
              if (editingProduct) {
                return prev.map((p) => (p.id === editingProduct.id ? { ...p, ...data } : p));
              } else {
                return [
                  ...prev,
                  {
                    id: Date.now(),
                    ...data,
                    stock_actual: Number(data.stock_actual || 0),
                    stock_retenido: 0,
                    activo: true
                  }
                ];
              }
            });
            showToast(editingProduct ? 'Producto actualizado' : 'Producto creado en el catálogo');
            setShowProductModal(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

// ==========================================
// COMPONENTE DE NAVEGACIÓN LATERAL
// ==========================================
function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
        active
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30 font-semibold'
          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
      }`}
    >
      <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
      <span>{label}</span>
    </button>
  );
}

// ==========================================
// VISTA 1 — INICIO DE SESIÓN
// ==========================================
function ViewLogin({ onLogin }) {
  const [email, setEmail] = useState('mariana@distribuidoraraiz.co');
  const [password, setPassword] = useState('123456');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(INITIAL_USER);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="bg-[#0F172A] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-bold text-2xl mb-6 shadow-xl">
              Á
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">ÁBACO</h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Cada unidad cuenta. Inventario, movimientos y decisiones comerciales en un mismo espacio de trabajo para distribuidores independientes.
            </p>
          </div>

          <div className="relative z-10 bg-slate-800/70 border border-slate-700/60 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                DR
              </div>
              <div>
                <p className="font-semibold text-xs text-white">Distribuidora Raíz</p>
                <p className="text-[11px] text-slate-400">Mariana Rojas • Bogotá, Colombia</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 italic">
              "ÁBACO me permite prestar producto a mis socios en la red sin perder la trazabilidad ni el control de stock."
            </p>
          </div>

          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        <div className="p-8 sm:p-10 flex flex-col justify-center bg-white">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Bienvenida a ÁBACO</h2>
            <p className="text-xs text-slate-500">
              Ingresa tus credenciales de distribuidor registrado para acceder a tu panel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Correo electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                placeholder="ejemplo@distribuidora.co"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 text-sm transition-all mt-2"
            >
              Iniciar sesión en mi negocio
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>¿Nuevo distribuidor?</span>
            <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Crear cuenta demo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VISTA 2 — RESUMEN DE TU NEGOCIO (DASHBOARD)
// ==========================================
function ViewDashboard({ products, movements, onNavigate }) {
  const totalAvailableUnits = useMemo(() => {
    return products.reduce((acc, p) => acc + (p.stock_actual - p.stock_retenido), 0);
  }, [products]);

  const totalInventoryCost = useMemo(() => {
    return products.reduce((acc, p) => acc + (p.stock_actual - p.stock_retenido) * p.costo_adquisicion, 0);
  }, [products]);

  const totalSalesRevenue = useMemo(() => {
    return movements
      .filter((m) => m.codigo === 'VENTA')
      .reduce((acc, m) => acc + Number(m.monto_total || 0), 0);
  }, [movements]);

  const totalSalesUnits = useMemo(() => {
    return movements
      .filter((m) => m.codigo === 'VENTA')
      .reduce((acc, m) => acc + Number(m.cantidad || 0), 0);
  }, [movements]);

  const lowStockProducts = useMemo(() => {
    return products.filter((p) => p.activo && p.stock_actual - p.stock_retenido <= p.stock_minimo);
  }, [products]);

  const pendingLoans = useMemo(() => {
    return movements.filter(
      (m) => m.codigo === 'PRESTAMO_ENVIADO' && (m.estado_cesion === 'PENDIENTE' || m.estado_cesion === 'ACEPTADA')
    );
  }, [movements]);

  const totalLoanedUnits = useMemo(() => {
    return pendingLoans.reduce((acc, m) => acc + Number(m.cantidad || 0), 0);
  }, [pendingLoans]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 via-slate-900 to-slate-900 p-6 rounded-2xl text-white shadow-xl">
        <div>
          <span className="text-xs uppercase tracking-wider text-blue-400 font-bold">Distribución Directa</span>
          <h3 className="text-xl font-bold text-white mt-0.5">Control Inteligente de Inventario</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Monitorea el inventario real en bodega, el stock retenido en préstamos a socios y toma decisiones basadas en rotación.
          </p>
        </div>
        <button
          onClick={() => onNavigate('movimientos')}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/40 text-sm flex items-center justify-center gap-2 shrink-0 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar movimiento</span>
        </button>
      </div>

      {/* TARJETAS KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Inventario Disponible</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Boxes className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{totalAvailableUnits} <span className="text-sm font-normal text-slate-500">unidades</span></div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Valor al costo:</span>
            <span className="font-bold text-slate-700">{formatCOP(totalInventoryCost)}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Ingresos por Ventas</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{formatCOP(totalSalesRevenue)}</div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Ventas registradas:</span>
            <span className="font-bold text-emerald-600">+{totalSalesUnits} u. vendidas</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Stock Bajo Alerta</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-600">{lowStockProducts.length} <span className="text-sm font-normal text-slate-500">productos</span></div>
          <div className="mt-2 text-xs text-slate-500 pt-2 border-t border-slate-100 truncate">
            {lowStockProducts.length > 0
              ? lowStockProducts.map((p) => p.nombre).join(', ')
              : 'Todo el inventario está sobre el mínimo'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Préstamos Pendientes</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-purple-900">{totalLoanedUnits} <span className="text-sm font-normal text-slate-500">u. en socios</span></div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Préstamos abiertos:</span>
            <span className="font-bold text-purple-700">{pendingLoans.length} operaciones</span>
          </div>
        </div>
      </div>

      {/* GRÁFICO Y ALERTAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Evolución de Ingresos por Ventas</h3>
              <p className="text-xs text-slate-400">Ventas brutas acumuladas por transacción reciente</p>
            </div>
            <button
              onClick={() => onNavigate('analitica')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Ver reporte analítico <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 flex items-end gap-4 pt-8 px-2 border-b border-slate-100">
            {movements
              .filter((m) => m.codigo === 'VENTA')
              .slice(0, 6)
              .map((m, idx) => {
                const maxRevenue = 300000;
                const heightPercent = Math.min(100, Math.max(15, (m.monto_total / maxRevenue) * 100));
                return (
                  <div key={m.id || idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-slate-900 text-white text-[10px] py-1 px-2 rounded font-semibold whitespace-nowrap z-10 pointer-events-none">
                      {formatCOP(m.monto_total)} ({m.cantidad} u.)
                    </div>
                    <div className="w-full bg-slate-100 rounded-t-xl overflow-hidden h-44 flex items-end">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-blue-600 group-hover:bg-blue-500 transition-all rounded-t-xl"
                      ></div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium truncate max-w-[60px]">
                      Venta #{m.id}
                    </span>
                  </div>
                );
              })}
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 mt-4">
            <span>Privacy by Design: Las ventas no guardan nombres personales de clientes finales</span>
            <span className="font-bold text-slate-700">Total: {formatCOP(totalSalesRevenue)}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Requieren tu atención
          </h3>

          <div className="space-y-3">
            {lowStockProducts.map((p) => {
              const disp = p.stock_actual - p.stock_retenido;
              return (
                <div key={p.id} className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs">
                  <div className="flex justify-between font-bold text-amber-900 mb-1">
                    <span>{p.nombre}</span>
                    <span className="text-amber-700">{disp} u. disp.</span>
                  </div>
                  <p className="text-amber-800 text-[11px] mb-2">
                    Mínimo requerido: {p.stock_minimo} u. {p.stock_retenido > 0 && `(${p.stock_retenido} u. retenidas)`}
                  </p>
                  <button
                    onClick={() => onNavigate('movimientos')}
                    className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg text-[11px] transition-colors"
                  >
                    Registrar compra o reponer
                  </button>
                </div>
              );
            })}

            {pendingLoans.map((m) => (
              <div key={m.id} className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs">
                <div className="flex justify-between font-bold text-purple-900 mb-1">
                  <span>Préstamo a {m.socio_nombre}</span>
                  <span className="text-purple-700">{m.cantidad} u.</span>
                </div>
                <p className="text-purple-800 text-[11px] mb-2">
                  Modalidad: {m.modalidad_retorno === 'DINERO' ? `Dinero (${formatCOP(m.monto_pactado_devolucion)})` : 'Producto'} • Estado: {m.estado_cesion}
                </p>
                <button
                  onClick={() => onNavigate('historial')}
                  className="w-full py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg text-[11px] transition-colors"
                >
                  Gestionar en historial
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VISTA 3 — CATÁLOGO DE PRODUCTOS (RF-01, RF-02)
// ==========================================
function ViewProducts({ products, onOpenModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('TODAS');
  const [stockStatusFilter, setStockStatusFilter] = useState('TODOS');

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.categoria)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.codigo_sku.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCat = categoryFilter === 'TODAS' || p.categoria === categoryFilter;

      const disp = p.stock_actual - p.stock_retenido;
      let matchStock = true;
      if (stockStatusFilter === 'STOCK_BAJO') matchStock = disp <= p.stock_minimo;
      if (stockStatusFilter === 'DISPONIBLE') matchStock = disp > 0;
      if (stockStatusFilter === 'INACTIVO') matchStock = !p.activo;

      return matchSearch && matchCat && matchStock;
    });
  }, [products, searchTerm, categoryFilter, stockStatusFilter]);

  const totalCatalogCost = useMemo(() => {
    return products.reduce((acc, p) => acc + (p.stock_actual - p.stock_retenido) * p.costo_adquisicion, 0);
  }, [products]);

  const handleExportCSV = () => {
    const headers = ['SKU', 'Nombre', 'Categoria', 'Unidad', 'Costo_Adquisicion', 'Precio_Publico', 'Stock_Actual', 'Stock_Retenido', 'Stock_Disponible', 'Stock_Minimo', 'Activo'];
    const rows = filteredProducts.map((p) => [
      p.codigo_sku,
      `"${p.nombre}"`,
      `"${p.categoria}"`,
      `"${p.unidad_medida}"`,
      p.costo_adquisicion,
      p.precio_publico,
      p.stock_actual,
      p.stock_retenido,
      p.stock_actual - p.stock_retenido,
      p.stock_minimo,
      p.activo ? 'SI' : 'NO'
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `catalogo_abaco_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Productos Activos</div>
            <div className="text-xl font-bold text-slate-900">{products.filter((p) => p.activo).length} registrados</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Valoración Total Al Costo</div>
            <div className="text-xl font-bold text-slate-900">{formatCOP(totalCatalogCost)}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Alertas Stock Bajo</div>
            <div className="text-xl font-bold text-amber-600">
              {products.filter((p) => p.activo && p.stock_actual - p.stock_retenido <= p.stock_minimo).length} bajo mínimo
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por SKU o Nombre..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-44 py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-700"
          >
            <option value="TODAS">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={stockStatusFilter}
            onChange={(e) => setStockStatusFilter(e.target.value)}
            className="w-full sm:w-40 py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-700"
          >
            <option value="TODOS">Todos los estados</option>
            <option value="STOCK_BAJO">Stock Bajo</option>
            <option value="DISPONIBLE">Con Stock</option>
          </select>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
          <button
            onClick={() => onOpenModal(null)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-blue-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Producto</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3.5">SKU / Producto</th>
                <th className="px-4 py-3.5">Categoría</th>
                <th className="px-4 py-3.5 text-right">Costo Unit.</th>
                <th className="px-4 py-3.5 text-right">Precio Venta</th>
                <th className="px-4 py-3.5 text-center">Stock Disponible</th>
                <th className="px-4 py-3.5 text-center">Mínimo</th>
                <th className="px-4 py-3.5 text-center">Estado</th>
                <th className="px-4 py-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => {
                const stockDisponible = p.stock_actual - p.stock_retenido;
                const isLow = stockDisponible <= p.stock_minimo;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 border border-slate-200">
                          {p.codigo_sku}
                        </span>
                        <div>
                          <div>{p.nombre}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{p.unidad_medida}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{p.categoria}</td>
                    <td className="px-4 py-3 text-right font-medium text-slate-700">{formatCOP(p.costo_adquisicion)}</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900">{formatCOP(p.precio_publico)}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className={`font-bold text-sm ${isLow ? 'text-amber-600' : 'text-slate-900'}`}>
                          {stockDisponible} u.
                        </span>
                        {p.stock_retenido > 0 && (
                          <span className="text-[10px] text-purple-600 font-medium">
                            ({p.stock_retenido} u. en tránsito)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center font-medium text-slate-500">{p.stock_minimo} u.</td>
                    <td className="px-4 py-3 text-center">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <AlertTriangle className="w-3 h-3" /> Stock Bajo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle className="w-3 h-3" /> OK
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => onOpenModal(p)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar producto"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VISTA 4 — REGISTRAR MOVIMIENTO (RF-03 A RF-06, RF-08)
// ==========================================
function ViewMovements({ products, partners, movements, onRegisterMovement }) {
  const [selectedType, setSelectedType] = useState('VENTA');
  const [productId, setProductId] = useState(products[0]?.id || '');
  const [cantidad, setCantidad] = useState(1);
  const [precioUnitario, setPrecioUnitario] = useState(products[0]?.precio_publico || 0);
  const [aliasCliente, setAliasCliente] = useState('');
  const [notasCliente, setNotasCliente] = useState('');
  const [selectedPartnerId, setSelectedPartnerId] = useState(partners[0]?.id || '');
  const [modalidadRetorno, setModalidadRetorno] = useState('PRODUCTO');
  const [montoPactadoDevolucion, setMontoPactadoDevolucion] = useState(0);
  const [idMovimientoRef, setIdMovimientoRef] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const openLoans = useMemo(() => {
    return movements.filter((m) => m.codigo === 'PRESTAMO_ENVIADO' && m.estado_cesion === 'ACEPTADA');
  }, [movements]);

  useEffect(() => {
    const p = products.find((prod) => prod.id === Number(productId));
    if (!p) return;

    if (selectedType === 'COMPRA') {
      setPrecioUnitario(p.costo_adquisicion);
    } else if (selectedType === 'VENTA') {
      setPrecioUnitario(p.precio_publico);
    } else {
      setPrecioUnitario(p.costo_adquisicion);
    }
  }, [productId, selectedType, products]);

  const selectedProduct = products.find((p) => p.id === Number(productId));
  const stockDisponible = selectedProduct ? selectedProduct.stock_actual - selectedProduct.stock_retenido : 0;
  const montoTotal = Number(cantidad) * Number(precioUnitario);

  const handleSubmit = (e) => {
    e.preventDefault();

    const partner = partners.find((pt) => pt.id === Number(selectedPartnerId));

    const typeCode = selectedType;
    let typeName = 'Venta a cliente final';

    if (selectedType === 'COMPRA') typeName = 'Compra de inventario';
    if (selectedType === 'AUTOCONSUMO') typeName = 'Autoconsumo / Muestra';
    if (selectedType === 'PRESTAMO_ENVIADO') typeName = 'Préstamo a socio';
    if (selectedType === 'CESION_DEFINITIVA_ENVIADA') typeName = 'Cesión definitiva a socio';
    if (selectedType === 'DEVOLUCION_PRESTAMO') typeName = 'Devolución de préstamo';

    onRegisterMovement({
      codigo: typeCode,
      tipo_nombre: typeName,
      id_producto: Number(productId),
      cantidad: Number(cantidad),
      precio_unitario: Number(precioUnitario),
      monto_total: montoTotal,
      alias_cliente: selectedType === 'VENTA' ? aliasCliente : undefined,
      notas_cliente: selectedType === 'VENTA' ? notasCliente : undefined,
      id_socio: ['PRESTAMO_ENVIADO', 'CESION_DEFINITIVA_ENVIADA', 'DEVOLUCION_PRESTAMO'].includes(selectedType)
        ? Number(selectedPartnerId)
        : undefined,
      socio_nombre: partner ? partner.nombre_alias : undefined,
      modalidad_retorno: selectedType === 'PRESTAMO_ENVIADO' ? modalidadRetorno : 'NO_APLICA',
      monto_pactado_devolucion: selectedType === 'PRESTAMO_ENVIADO' && modalidadRetorno === 'DINERO'
        ? Number(montoPactadoDevolucion)
        : undefined,
      estado_cesion: selectedType === 'PRESTAMO_ENVIADO' ? 'PENDIENTE' : 'NO_APLICA',
      id_movimiento_ref: selectedType === 'DEVOLUCION_PRESTAMO' ? Number(idMovimientoRef) : undefined,
      observaciones,
      efecto: ['COMPRA', 'DEVOLUCION_PRESTAMO'].includes(selectedType) ? 1 : selectedType === 'PRESTAMO_ENVIADO' ? 0 : -1
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <TypeCard
          title="Compra"
          subtitle="Entrada · al costo"
          icon={Boxes}
          active={selectedType === 'COMPRA'}
          onClick={() => setSelectedType('COMPRA')}
        />
        <TypeCard
          title="Venta"
          subtitle="Salida · con ingreso"
          icon={ShoppingCart}
          active={selectedType === 'VENTA'}
          onClick={() => setSelectedType('VENTA')}
        />
        <TypeCard
          title="Autoconsumo"
          subtitle="Salida · sin ingreso"
          icon={Tag}
          active={selectedType === 'AUTOCONSUMO'}
          onClick={() => setSelectedType('AUTOCONSUMO')}
        />
        <TypeCard
          title="Préstamo"
          subtitle="Salida · retornable"
          icon={ArrowRightLeft}
          active={selectedType === 'PRESTAMO_ENVIADO'}
          onClick={() => setSelectedType('PRESTAMO_ENVIADO')}
        />
        <TypeCard
          title="Cesión"
          subtitle="Salida · sin retorno"
          icon={ArrowUpRight}
          active={selectedType === 'CESION_DEFINITIVA_ENVIADA'}
          onClick={() => setSelectedType('CESION_DEFINITIVA_ENVIADA')}
        />
        <TypeCard
          title="Devolución"
          subtitle="Entrada · de préstamo"
          icon={Repeat}
          active={selectedType === 'DEVOLUCION_PRESTAMO'}
          onClick={() => setSelectedType('DEVOLUCION_PRESTAMO')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3 mb-4">
              Detalles de la Operación
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Producto afectado</label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-600"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.codigo_sku} — {p.nombre} (Stock disp: {p.stock_actual - p.stock_retenido} u.)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cantidad de unidades</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Precio unitario (COP)</label>
                <input
                  type="number"
                  required
                  value={precioUnitario}
                  onChange={(e) => setPrecioUnitario(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {selectedType === 'VENTA' && (
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Privacy by Design (Ley 1581 de 2012)</span>
                </div>
                <p className="text-[11px] text-blue-700">
                  No se solicitan ni almacenan cédulas, direcciones ni correos personales de clientes finales.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Alias del cliente (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ej. Carlos - Charcutería"
                      value={aliasCliente}
                      onChange={(e) => setAliasCliente(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Notas del cliente (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ej. Prefiere entregas los viernes"
                      value={notasCliente}
                      onChange={(e) => setNotasCliente(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {['PRESTAMO_ENVIADO', 'CESION_DEFINITIVA_ENVIADA'].includes(selectedType) && (
              <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 space-y-3">
                <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
                  <ArrowRightLeft className="w-4 h-4 text-purple-600" />
                  <span>Flujo Bilateral con Red de Distribuidores</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Socio destinatario</label>
                  <select
                    value={selectedPartnerId}
                    onChange={(e) => setSelectedPartnerId(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-purple-600"
                  >
                    {partners.map((pt) => (
                      <option key={pt.id} value={pt.id}>
                        {pt.nombre_alias} ({pt.negocio})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedType === 'PRESTAMO_ENVIADO' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Modalidad de retorno</label>
                      <select
                        value={modalidadRetorno}
                        onChange={(e) => setModalidadRetorno(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-purple-600"
                      >
                        <option value="PRODUCTO">Retorno en Producto (Mismas unidades)</option>
                        <option value="DINERO">Retorno en Dinero (Pago en COP)</option>
                      </select>
                    </div>

                    {modalidadRetorno === 'DINERO' && (
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Monto pactado (COP)</label>
                        <input
                          type="number"
                          required
                          value={montoPactadoDevolucion}
                          onChange={(e) => setMontoPactadoDevolucion(e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-600"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {selectedType === 'DEVOLUCION_PRESTAMO' && (
              <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-100 space-y-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Seleccionar préstamo abierto a liquidar</label>
                <select
                  value={idMovimientoRef}
                  onChange={(e) => setIdMovimientoRef(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-600"
                >
                  <option value="">Selecciona una operación...</option>
                  {openLoans.map((m) => (
                    <option key={m.id} value={m.id}>
                      Préstamo #{m.id} — Socio: {m.socio_nombre} ({m.cantidad} u.) — Retorno: {m.modalidad_retorno}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Observaciones (Opcional)</label>
              <textarea
                rows="2"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                placeholder="Notas adicionales sobre la entrega o despacho..."
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 text-xs uppercase tracking-wider transition-all"
            >
              Registrar Operación en Sistema
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
            Resumen del Movimiento
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Producto:</span>
              <span className="font-semibold text-slate-900">{selectedProduct?.nombre || '-'}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>SKU:</span>
              <span className="font-mono text-slate-700">{selectedProduct?.codigo_sku || '-'}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Stock actual en bodega:</span>
              <span className="font-bold text-slate-900">{selectedProduct?.stock_actual || 0} u.</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Stock Disponible:</span>
                <span className="font-bold text-slate-900">{stockDisponible} u.</span>
              </div>
              <div className="flex justify-between text-purple-700">
                <span>Stock Retenido en tránsito:</span>
                <span className="font-bold">{selectedProduct?.stock_retenido || 0} u.</span>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 space-y-2">
              <div className="flex justify-between font-bold text-slate-900 text-sm">
                <span>Total de la transacción:</span>
                <span className="text-blue-700">{formatCOP(montoTotal)}</span>
              </div>
              <p className="text-[11px] text-blue-800">
                {selectedType === 'VENTA' && 'Representa ingreso directo para tu negocio.'}
                {selectedType === 'COMPRA' && 'Representa egreso de caja para adquisición de mercancía.'}
                {selectedType === 'PRESTAMO_ENVIADO' && 'El stock se retiene hasta la aceptación del socio.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypeCard({ title, subtitle, icon: Icon, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
        active
          ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50'
      }`}
    >
      <div className={`p-2 rounded-xl w-fit mb-2 ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="font-bold text-xs">{title}</div>
        <div className={`text-[10px] ${active ? 'text-blue-100' : 'text-slate-400'}`}>{subtitle}</div>
      </div>
    </button>
  );
}

// ==========================================
// VISTA 5 — HISTORIAL Y EXISTENCIAS (RF-07)
// ==========================================
function ViewHistory({ movements, products, onLiquidateLoan }) {
  const [filterType, setFilterType] = useState('TODOS');
  const [filterProduct, setFilterProduct] = useState('TODOS');

  const openLoans = useMemo(() => {
    return movements.filter(
      (m) => m.codigo === 'PRESTAMO_ENVIADO' && (m.estado_cesion === 'PENDIENTE' || m.estado_cesion === 'ACEPTADA')
    );
  }, [movements]);

  const filteredMovements = useMemo(() => {
    return movements.filter((m) => {
      const matchType = filterType === 'TODOS' || m.codigo === filterType;
      const matchProd = filterProduct === 'TODOS' || m.id_producto === Number(filterProduct);
      return matchType && matchProd;
    });
  }, [movements, filterType, filterProduct]);

  const handleExportCSV = () => {
    const headers = ['ID_Movimiento', 'Fecha', 'Tipo', 'SKU', 'Cantidad', 'Precio_Unitario', 'Monto_Total', 'Socio_o_Alias', 'Estado_Cesion'];
    const rows = filteredMovements.map((m) => {
      const prod = products.find((p) => p.id === m.id_producto);
      return [
        m.id,
        `"${m.fecha_registro}"`,
        `"${m.tipo_nombre}"`,
        `"${prod?.codigo_sku || '-'}"`,
        m.cantidad,
        m.precio_unitario,
        m.monto_total,
        `"${m.alias_cliente || m.socio_nombre || '-'}"`,
        `"${m.estado_cesion || 'NO_APLICA'}"`
      ];
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `historial_abaco_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {openLoans.length > 0 && (
        <div className="bg-purple-900 text-white p-5 rounded-2xl shadow-lg border border-purple-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-base">Préstamos Abiertos Pendientes de Liquidación</h3>
            </div>
            <span className="text-xs bg-purple-800 text-purple-200 px-2.5 py-1 rounded-full font-semibold">
              {openLoans.length} abiertos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {openLoans.map((m) => {
              const prod = products.find((p) => p.id === m.id_producto);
              return (
                <div key={m.id} className="bg-purple-950/60 p-3 rounded-xl border border-purple-800/80 text-xs">
                  <div className="flex justify-between font-semibold mb-1 text-purple-100">
                    <span>Socio: {m.socio_nombre}</span>
                    <span className="text-purple-300">#{m.id}</span>
                  </div>
                  <div className="text-purple-200 mb-2">
                    {prod?.nombre} ({m.cantidad} u.) • Retorno: {m.modalidad_retorno}
                  </div>
                  <button
                    onClick={() => onLiquidateLoan(m)}
                    className="w-full py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg text-[11px] transition-colors"
                  >
                    Liquidar / Registrar Devolución
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:ring-2 focus:ring-blue-600"
          >
            <option value="TODOS">Todos los tipos de movimiento</option>
            <option value="COMPRA">Compras</option>
            <option value="VENTA">Ventas</option>
            <option value="AUTOCONSUMO">Autoconsumo</option>
            <option value="PRESTAMO_ENVIADO">Préstamos</option>
            <option value="CESION_DEFINITIVA_ENVIADA">Cesiones</option>
            <option value="DEVOLUCION_PRESTAMO">Devoluciones</option>
          </select>

          <select
            value={filterProduct}
            onChange={(e) => setFilterProduct(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:ring-2 focus:ring-blue-600"
          >
            <option value="TODOS">Todos los productos</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre} ({p.codigo_sku})</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exportar Historial CSV</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3.5">ID / Fecha</th>
                <th className="px-4 py-3.5">Tipo Movimiento</th>
                <th className="px-4 py-3.5">Producto</th>
                <th className="px-4 py-3.5 text-center">Cantidad</th>
                <th className="px-4 py-3.5 text-right">Monto Total</th>
                <th className="px-4 py-3.5">Socio / Cliente</th>
                <th className="px-4 py-3.5 text-center">Estado Cesión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMovements.map((m) => {
                const prod = products.find((p) => p.id === m.id_producto);
                return (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-500">
                      <div>#{m.id}</div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(m.fecha_registro).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] bg-slate-100 border border-slate-200">
                        {m.tipo_nombre}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">{prod?.nombre || '-'}</td>
                    <td className="px-4 py-3 text-center font-bold">
                      <span className={m.efecto > 0 ? 'text-emerald-600' : 'text-slate-800'}>
                        {m.efecto > 0 ? `+${m.cantidad}` : `-${m.cantidad}`} u.
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900">{formatCOP(m.monto_total)}</td>
                    <td className="px-4 py-3 text-slate-600">{m.alias_cliente || m.socio_nombre || '-'}</td>
                    <td className="px-4 py-3 text-center">
                      {m.estado_cesion === 'PENDIENTE' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Pendiente aprobación
                        </span>
                      )}
                      {m.estado_cesion === 'ACEPTADA' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                          Abierta (Aceptada)
                        </span>
                      )}
                      {m.estado_cesion === 'COMPLETADA' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Completada
                        </span>
                      )}
                      {(!m.estado_cesion || m.estado_cesion === 'NO_APLICA') && (
                        <span className="text-slate-400 text-[10px]">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VISTA 6 — ANALÍTICA Y REPORTES (RF-09, RF-10, RF-11)
// ==========================================
function ViewAnalytics({ products, movements }) {
  const salesMovements = useMemo(() => movements.filter((m) => m.codigo === 'VENTA'), [movements]);

  const totalSalesRevenue = useMemo(() => {
    return salesMovements.reduce((acc, m) => acc + Number(m.monto_total || 0), 0);
  }, [salesMovements]);

  const totalCostOfGoodsSold = useMemo(() => {
    return salesMovements.reduce((acc, m) => {
      const prod = products.find((p) => p.id === m.id_producto);
      const cost = prod ? prod.costo_adquisicion : m.precio_unitario;
      return acc + m.cantidad * cost;
    }, 0);
  }, [salesMovements, products]);

  const estimatedGrossMargin = totalSalesRevenue - totalCostOfGoodsSold;
  const grossMarginPercentage = totalSalesRevenue > 0 ? (estimatedGrossMargin / totalSalesRevenue) * 100 : 0;

  const totalUnitsSold = useMemo(() => {
    return salesMovements.reduce((acc, m) => acc + m.cantidad, 0);
  }, [salesMovements]);

  const replenishmentSuggestions = useMemo(() => {
    return products.map((p) => {
      const disp = p.stock_actual - p.stock_retenido;
      const productSales = salesMovements
        .filter((m) => m.id_producto === p.id)
        .reduce((acc, m) => acc + m.cantidad, 0);

      const targetStock = Math.max(p.stock_minimo * 2, Math.ceil(productSales * 1.5));
      const suggestedToOrder = Math.max(0, targetStock - disp);

      return {
        ...p,
        disp,
        totalVendidas: productSales,
        sugerido: suggestedToOrder,
        requierePedido: disp <= p.stock_minimo
      };
    });
  }, [products, salesMovements]);

  const handleExportAnalyticsCSV = () => {
    const headers = ['SKU', 'Producto', 'Categoria', 'Stock_Disponible', 'Total_Vendidas', 'Stock_Minimo', 'Sugerido_Reponer', 'Alerta_Stock'];
    const rows = replenishmentSuggestions.map((r) => [
      r.codigo_sku,
      `"${r.nombre}"`,
      `"${r.categoria}"`,
      r.disp,
      r.totalVendidas,
      r.stock_minimo,
      r.sugerido,
      r.requierePedido ? 'CRITICO' : 'OK'
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `analitica_abaco_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Indicadores Descriptivos Comercial</h3>
          <p className="text-xs text-slate-400">Analítica en tiempo real basada exclusivamente en ventas reales</p>
        </div>
        <button
          onClick={handleExportAnalyticsCSV}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-blue-600/30 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exportar Reporte Analítico CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Ingresos por Ventas</div>
          <div className="text-2xl font-extrabold text-slate-900">{formatCOP(totalSalesRevenue)}</div>
          <div className="text-[11px] text-slate-400 mt-1">Excluye préstamos y muestras</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Costo de lo Vendido</div>
          <div className="text-2xl font-extrabold text-slate-700">{formatCOP(totalCostOfGoodsSold)}</div>
          <div className="text-[11px] text-slate-400 mt-1">Costo de adquisición directo</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Margen Bruto Estimado</div>
          <div className="text-2xl font-extrabold text-emerald-600">{formatCOP(estimatedGrossMargin)}</div>
          <div className="text-[11px] font-bold text-emerald-700 mt-1">{grossMarginPercentage.toFixed(1)}% margen de ganancia</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Unidades Totales Vendidas</div>
          <div className="text-2xl font-extrabold text-blue-900">{totalUnitsSold} <span className="text-sm font-normal text-slate-500">u.</span></div>
          <div className="text-[11px] text-slate-400 mt-1">Rotación acumulada</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-4">
          <h3 className="font-bold text-slate-900 text-base">Sugerencias de Reposición y Sugerencias Comerciales</h3>
          <p className="text-xs text-slate-400">
            Algoritmo inteligente de reabastecimiento: evalúa stock disponible vs ventas de rotación
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3.5">SKU / Producto</th>
                <th className="px-4 py-3.5 text-center">Disponible</th>
                <th className="px-4 py-3.5 text-center">Ventas Realizadas</th>
                <th className="px-4 py-3.5 text-center">Mínimo</th>
                <th className="px-4 py-3.5 text-center">Sugerido a Reponer</th>
                <th className="px-4 py-3.5 text-center">Estado Alerta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {replenishmentSuggestions.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    <span className="font-mono text-[11px] text-slate-500 mr-2">{r.codigo_sku}</span>
                    {r.nombre}
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800">{r.disp} u.</td>
                  <td className="px-4 py-3 text-center font-semibold text-blue-700">+{r.totalVendidas} u.</td>
                  <td className="px-4 py-3 text-center text-slate-500">{r.stock_minimo} u.</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-900">
                    {r.sugerido > 0 ? (
                      <span className="text-amber-700 font-extrabold bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                        Pedir {r.sugerido} u.
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-medium">Suficiente</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {r.requierePedido ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        Alerta Reposición
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                        Stock Óptimo
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MODAL CREAR / EDITAR PRODUCTO
// ==========================================
function ModalProduct({ editingProduct, onClose, onSave }) {
  const [formData, setFormData] = useState({
    codigo_sku: editingProduct?.codigo_sku || '',
    nombre: editingProduct?.nombre || '',
    categoria: editingProduct?.categoria || 'Cuidado personal',
    unidad_medida: editingProduct?.unidad_medida || 'unidad',
    costo_adquisicion: editingProduct?.costo_adquisicion || 0,
    precio_publico: editingProduct?.precio_publico || 0,
    stock_actual: editingProduct?.stock_actual || 0,
    stock_minimo: editingProduct?.stock_minimo || 5
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      costo_adquisicion: Number(formData.costo_adquisicion),
      precio_publico: Number(formData.precio_publico),
      stock_actual: Number(formData.stock_actual),
      stock_minimo: Number(formData.stock_minimo)
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">
            {editingProduct ? 'Editar Producto' : 'Nuevo Producto en Catálogo'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Código SKU</label>
              <input
                type="text"
                required
                placeholder="Ej. CP-005"
                value={formData.codigo_sku}
                onChange={(e) => setFormData({ ...formData, codigo_sku: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Categoría</label>
              <input
                type="text"
                required
                placeholder="Ej. Cuidado personal"
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Nombre del producto</label>
              <input
                type="text"
                required
                placeholder="Ej. Jabón botánico"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Unidad medida</label>
              <input
                type="text"
                required
                placeholder="Ej. 120 g"
                value={formData.unidad_medida}
                onChange={(e) => setFormData({ ...formData, unidad_medida: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Costo adquisición (COP)</label>
              <input
                type="number"
                min="0"
                required
                value={formData.costo_adquisicion}
                onChange={(e) => setFormData({ ...formData, costo_adquisicion: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Precio venta público (COP)</label>
              <input
                type="number"
                min="0"
                required
                value={formData.precio_publico}
                onChange={(e) => setFormData({ ...formData, precio_publico: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {!editingProduct && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Existencia inicial (u.)</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.stock_actual}
                  onChange={(e) => setFormData({ ...formData, stock_actual: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Stock mínimo alerta (u.)</label>
              <input
                type="number"
                min="1"
                required
                value={formData.stock_minimo}
                onChange={(e) => setFormData({ ...formData, stock_minimo: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-600/30 transition-all"
            >
              {editingProduct ? 'Guardar cambios' : 'Crear producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}