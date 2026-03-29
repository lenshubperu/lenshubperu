import { FileText } from "lucide-react";

export default function TerminosPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* HERO */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
            <FileText className="h-5 w-5 text-neutral-950" />
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            Términos y condiciones
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
            El presente documento regula el acceso y uso del sitio web de
            LensHubPeru, así como las condiciones aplicables a las compras
            realizadas a través de nuestra plataforma.
          </p>
        </div>
      </section>

      {/* CONTENIDO LEGAL */}
      <section>
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20 space-y-12 text-sm leading-7 text-neutral-700">

          {/* 1 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              1. Identificación del proveedor
            </h2>
            <p className="mt-3">
              El presente sitio web es operado por LensHubPeru, marca comercial
              de DIGITAL HUB & CO PERU S.A.C., identificada con RUC
              N° 20605303251, con domicilio en Telares 155, Perú.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              2. Aceptación de los términos
            </h2>
            <p className="mt-3">
              El acceso y uso de este sitio web atribuye la condición de usuario
              e implica la aceptación plena y sin reservas de todos los términos
              y condiciones aquí establecidos.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              3. Productos y disponibilidad
            </h2>
            <p className="mt-3">
              Los productos ofrecidos en el sitio están sujetos a disponibilidad
              de stock. LensHubPeru se reserva el derecho de modificar,
              actualizar o descontinuar productos sin previo aviso.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              4. Precios y pagos
            </h2>
            <p className="mt-3">
              Todos los precios están expresados en soles peruanos (S/.) e
              incluyen los impuestos de ley aplicables. El pago se realiza a
              través de los métodos disponibles en la plataforma.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              5. Proceso de compra
            </h2>
            <p className="mt-3">
              El cliente deberá proporcionar información veraz y completa al
              momento de realizar la compra. La confirmación del pedido está
              sujeta a la validación del pago por parte de LensHubPeru.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              6. Envíos y entregas
            </h2>
            <p className="mt-3">
              Los tiempos de entrega son referenciales y pueden variar por
              factores externos. LensHubPeru no se responsabiliza por retrasos
              atribuibles a terceros operadores logísticos.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              7. Garantía y devoluciones
            </h2>
            <p className="mt-3">
              Los productos cuentan con garantía de 1 año, conforme a las
              condiciones establecidas. Las devoluciones pueden solicitarse
              dentro de los 7 días calendario, sujetas a evaluación del estado
              del producto.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              8. Protección al consumidor
            </h2>
            <p className="mt-3">
              De conformidad con el Código de Protección y Defensa del
              Consumidor (Ley N° 29571), el cliente tiene derecho a recibir
              información clara, veraz y oportuna sobre los productos y
              servicios ofrecidos.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              9. Comprobantes de pago
            </h2>
            <p className="mt-3">
              Se emiten comprobantes de pago electrónicos (boleta o factura)
              conforme a la normativa tributaria vigente en el Perú.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              10. Protección de datos personales
            </h2>
            <p className="mt-3">
              Los datos personales proporcionados por el usuario serán tratados
              conforme a la Ley N° 29733 – Ley de Protección de Datos
              Personales, garantizando su confidencialidad y uso adecuado.
            </p>
          </div>

          {/* 11 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              11. Modificaciones
            </h2>
            <p className="mt-3">
              LensHubPeru se reserva el derecho de modificar los presentes
              términos y condiciones en cualquier momento, siendo responsabilidad
              del usuario revisarlos periódicamente.
            </p>
          </div>

          {/* 12 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              12. Legislación aplicable
            </h2>
            <p className="mt-3">
              Los presentes términos se rigen por las leyes de la República del
              Perú. Cualquier controversia será resuelta ante las autoridades
              competentes del país.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}