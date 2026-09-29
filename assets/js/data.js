/* ==========================================================================
   TEKUNO · MICROSITIO — DATOS DE CONTENIDO
   --------------------------------------------------------------------------
   Toda la información que muestra el sitio vive aquí. Para editar textos,
   agregar módulos, o conectar un video real, este es el único archivo que
   normalmente necesitas tocar (no hace falta saber JS a fondo).

   Estructura:
   CATEGORIES (nivel 1, la home)
     -> submenu: MODULES (nivel 2, ficha por función)
          -> detail: video, ficha funcional, ficha técnica

   Cada "componente" de la ficha funcional es { titulo, desc } — se muestra
   como "**titulo:** desc" en una sola línea con viñeta, igual que en el
   video de referencia (ej. "Gestión de usuarios: Acceso seguro mediante...").

   Nota de contenido: el texto de "Recursos Humanos" está desarrollado como
   ejemplo funcional completo, tomado del video/prototipo que compartió el
   equipo. El resto de categorías están armadas con la misma estructura pero
   como placeholders, listas para que el equipo llene el contenido real.
   ========================================================================== */

const TEKUNO_DATA = {

  categories: [
    {
      id: "gestion-documental",
      name: "Gestión documental",
      desc: "Digitalización, resguardo y control de expedientes.",
      icon: "doc",
      status: "pendiente",
      modules: [
        {
          id: "expedientes-digitales",
          name: "Expedientes digitales",
          desc: "Repositorio central de documentos con control de versiones.",
          status: "pendiente",
          video: null,
          ficha_funcional: { resumen: "Contenido pendiente de definir con el equipo de producto.", componentes: [] },
          ficha_tecnica: { tecnologias: [], lenguaje: [], frameworks: [] }
        },
        {
          id: "firma-electronica",
          name: "Firma electrónica",
          desc: "Firma y sellado digital de documentos con validez legal.",
          status: "pendiente",
          video: null,
          ficha_funcional: { resumen: "Contenido pendiente de definir con el equipo de producto.", componentes: [] },
          ficha_tecnica: { tecnologias: [], lenguaje: [], frameworks: [] }
        }
      ]
    },

    {
      id: "automatizacion",
      name: "Automatización y Desarrollo",
      desc: "Workflows, mesas de control y desarrollo a la medida.",
      icon: "flow",
      status: "pendiente",
      modules: [
        {
          id: "mesas-control",
          name: "Mesas de control",
          desc: "Seguimiento de trámites y aprobaciones en tiempo real.",
          status: "pendiente",
          video: null,
          ficha_funcional: { resumen: "Contenido pendiente de definir con el equipo de producto.", componentes: [] },
          ficha_tecnica: { tecnologias: [], lenguaje: [], frameworks: [] }
        }
      ]
    },

    {
      id: "recursos-humanos",
      name: "Recursos Humanos",
      desc: "Herramientas para gestión de personal y clima laboral.",
      icon: "team",
      status: "activo",
      modules: [
        {
          id: "bolsa-trabajo",
          name: "Bolsa de trabajo",
          desc: "Descripción corta de la solución.",
          status: "activo",
          video: null, // ejemplo: "assets/video/bolsa-trabajo.mp4"
          ficha_funcional: {
            resumen: "La plataforma web es una solución integral diseñada para facilitar la distribución y firma electrónica de documentos en formato PDF, específicamente compatible con la firma FIEL.",
            componentes: [
              { titulo: "Gestión de usuarios", desc: "Acceso seguro mediante usuario y contraseña para cargar y administrar documentos." },
              { titulo: "Carga de documentos", desc: "Los usuarios pueden subir archivos PDF que requieren firma electrónica." },
              { titulo: "Seguimiento de firmas", desc: "Panel de estatus para ver qué documentos siguen pendientes de firma y cuáles ya están completos." },
              { titulo: "Notificaciones automáticas", desc: "Aviso a los firmantes cuando un documento nuevo queda listo para su revisión." }
            ]
          },
          ficha_tecnica: {
            tecnologias: ["PostgreSQL", "SQL Server", "Tailwind CSS"],
            lenguaje: ["PHP 8.3", "JavaScript"],
            frameworks: ["Laravel", "Vue.js"]
          }
        },
        {
          id: "clima-laboral",
          name: "Clima laboral",
          desc: "Descripción corta de la solución.",
          status: "activo",
          video: null,
          ficha_funcional: {
            resumen: "Módulo de encuestas periódicas para medir clima organizacional por área y equipo, con reportes comparativos entre periodos.",
            componentes: [
              { titulo: "Creación de encuestas", desc: "Plantillas predefinidas o personalizadas por área." },
              { titulo: "Envío programado", desc: "Recordatorios automáticos a colaboradores pendientes de responder." },
              { titulo: "Resultados anónimos", desc: "Agregados por área, equipo y antigüedad, sin exponer respuestas individuales." },
              { titulo: "Alertas automáticas", desc: "Aviso a RH cuando un indicador baja del umbral configurado." }
            ]
          },
          ficha_tecnica: {
            tecnologias: ["PostgreSQL", "Tailwind CSS"],
            lenguaje: ["PHP 8.3", "JavaScript"],
            frameworks: ["Laravel", "Vue.js"]
          }
        },
        {
          id: "credenciales",
          name: "Credenciales",
          desc: "Descripción corta de la solución.",
          status: "activo",
          video: null,
          ficha_funcional: {
            resumen: "Automatiza la generación de credenciales de identificación para colaboradores, con código QR de validación y control de vigencia.",
            componentes: [
              { titulo: "Plantillas de credencial", desc: "Datos variables por colaborador, listos para imprimir." },
              { titulo: "Código QR", desc: "Generación automática para validar identidad en accesos." },
              { titulo: "Control de vigencia", desc: "Reimpresión ante pérdida o renovación programada." },
              { titulo: "Historial por colaborador", desc: "Registro de todas las credenciales emitidas." }
            ]
          },
          ficha_tecnica: {
            tecnologias: ["PostgreSQL"],
            lenguaje: ["PHP 8.3", "JavaScript"],
            frameworks: ["Laravel", "Vue.js"]
          }
        },
        {
          id: "evaluacion-360",
          name: "Evaluación 360",
          desc: "Descripción corta de la solución.",
          status: "activo",
          video: null,
          ficha_funcional: {
            resumen: "Levanta evaluaciones de desempeño desde jefe directo, pares y autoevaluación, consolidando resultados en un reporte individual.",
            componentes: [
              { titulo: "Competencias por puesto", desc: "Configuración de escalas de evaluación según el rol." },
              { titulo: "Asignación automática", desc: "Evaluadores definidos según el organigrama." },
              { titulo: "Reporte consolidado", desc: "Resultados comparativos por colaborador y periodo." },
              { titulo: "Historial de desarrollo", desc: "Seguimiento de evaluaciones a lo largo del tiempo." }
            ]
          },
          ficha_tecnica: {
            tecnologias: ["PostgreSQL", "Tailwind CSS"],
            lenguaje: ["PHP 8.3", "JavaScript"],
            frameworks: ["Laravel", "Vue.js"]
          }
        },
        {
          id: "prestamos-nomina",
          name: "Gestión de préstamos sobre nómina",
          desc: "Descripción corta de la solución.",
          status: "activo",
          video: null,
          ficha_funcional: {
            resumen: "Gestiona el ciclo completo de préstamos a colaboradores: solicitud, autorización y descuento automático vía nómina.",
            componentes: [
              { titulo: "Solicitud de préstamo", desc: "Con validación automática del tope autorizado." },
              { titulo: "Flujo de aprobación", desc: "Autorización por jefatura y Recursos Humanos." },
              { titulo: "Descuento automático", desc: "Cálculo por periodo de nómina, sin captura manual." },
              { titulo: "Consulta de saldo", desc: "Amortizaciones restantes visibles para el colaborador." }
            ]
          },
          ficha_tecnica: {
            tecnologias: ["SQL Server", "Tailwind CSS"],
            lenguaje: ["PHP 8.3", "JavaScript"],
            frameworks: ["Laravel", "Vue.js"]
          }
        },
        {
          id: "solicitud-vacaciones",
          name: "Solicitud de vacaciones",
          desc: "Descripción corta de la solución.",
          status: "activo",
          video: null,
          ficha_funcional: {
            resumen: "Permite a los colaboradores solicitar días de vacaciones, consultar su saldo disponible y recibir aprobación directa de su jefatura.",
            componentes: [
              { titulo: "Saldo automático", desc: "Cálculo de días disponibles según antigüedad (LFT)." },
              { titulo: "Solicitud y aprobación", desc: "Notificación directa a la jefatura correspondiente." },
              { titulo: "Calendario de equipo", desc: "Traslapes visibles antes de aprobar una solicitud." },
              { titulo: "Historial", desc: "Vacaciones tomadas y pendientes por colaborador." }
            ]
          },
          ficha_tecnica: {
            tecnologias: ["PostgreSQL", "Tailwind CSS"],
            lenguaje: ["PHP 8.3", "JavaScript"],
            frameworks: ["Laravel", "Vue.js"]
          }
        },
        {
          id: "tekasist",
          name: "TekAsist",
          desc: "Descripción corta de la solución.",
          status: "activo",
          video: null,
          ficha_funcional: {
            resumen: "Asistente conversacional interno que resuelve dudas frecuentes de RH y canaliza casos que requieren atención humana.",
            componentes: [
              { titulo: "Respuestas automáticas", desc: "Preguntas frecuentes de políticas y prestaciones." },
              { titulo: "Canalización de casos", desc: "Envío al equipo humano correspondiente cuando es necesario." },
              { titulo: "Recordatorios proactivos", desc: "Checar entrada/salida, trámites pendientes." },
              { titulo: "Base de conocimiento", desc: "Panel de administración para mantenerla actualizada." }
            ]
          },
          ficha_tecnica: {
            tecnologias: ["PostgreSQL"],
            lenguaje: ["PHP 8.3", "JavaScript"],
            frameworks: ["Laravel", "Vue.js"]
          }
        },
        {
          id: "pruebas-psicometricas",
          name: "Pruebas psicométricas",
          desc: "Descripción corta de la solución.",
          status: "activo",
          video: null,
          ficha_funcional: {
            resumen: "Aplica pruebas psicométricas en línea con calificación automática y reporte interpretativo para el equipo de reclutamiento.",
            componentes: [
              { titulo: "Banco de pruebas", desc: "Configurable por perfil de puesto." },
              { titulo: "Aplicación en línea", desc: "Con tiempo límite y guardado automático." },
              { titulo: "Calificación automática", desc: "Reporte interpretativo generado por candidato." },
              { titulo: "Comparativo de candidatos", desc: "Para una misma vacante, lado a lado." }
            ]
          },
          ficha_tecnica: {
            tecnologias: ["PostgreSQL", "Tailwind CSS"],
            lenguaje: ["PHP 8.3", "JavaScript"],
            frameworks: ["Laravel", "Vue.js"]
          }
        }
      ]
    },

    {
      id: "saas",
      name: "SaaS",
      desc: "Plataformas y suscripciones de software como servicio.",
      icon: "cloud",
      status: "pendiente",
      modules: [
        {
          id: "plataforma-digital",
          name: "Plataforma digital",
          desc: "Descripción corta de la categoría.",
          status: "pendiente",
          video: null,
          ficha_funcional: { resumen: "Contenido pendiente de definir con el equipo de producto.", componentes: [] },
          ficha_tecnica: { tecnologias: [], lenguaje: [], frameworks: [] }
        }
      ]
    },

    {
      id: "hardware",
      name: "Hardware",
      desc: "Equipos y soluciones físicas complementarias.",
      icon: "chip",
      status: "pendiente",
      modules: [
        {
          id: "equipos-captura",
          name: "Equipos de captura",
          desc: "Descripción corta de la categoría.",
          status: "pendiente",
          video: null,
          ficha_funcional: { resumen: "Contenido pendiente de definir con el equipo de producto.", componentes: [] },
          ficha_tecnica: { tecnologias: [], lenguaje: [], frameworks: [] }
        }
      ]
    }
  ]
};
