import { ShieldCheck } from "lucide-react";

export default function PoliticaPrivacidadPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* HERO */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
            <ShieldCheck className="h-5 w-5 text-neutral-950" />
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            Política de privacidad
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
            En LensHubPeru respetamos tu privacidad y protegemos tus datos
            personales conforme a la normativa vigente en el Perú.
          </p>
        </div>
      </section>

      {/* CONTENIDO */}
      <section>
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20 space-y-12 text-sm leading-7 text-neutral-700">

          {/* 1 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              1. Identificación del responsable
            </h2>
            <p className="mt-3">
              LensHubPeru, marca comercial de DIGITAL HUB & CO PERU S.A.C.,
              identificada con RUC N° 20605303251, es responsable del
              tratamiento de los datos personales recopilados a través de este
              sitio web.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              2. Datos que recopilamos
            </h2>
            <p className="mt-3">
              Podemos recopilar datos personales tales como nombre, número de
              documento, correo electrónico, número de teléfono, dirección de
              envío y cualquier otra información necesaria para procesar una
              compra.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              3. Finalidad del tratamiento
            </h2>
            <p className="mt-3">
              Los datos personales son utilizados para:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>Procesar pedidos y gestionar entregas.</li>
              <li>Contactar al cliente para confirmar compras.</li>
              <li>Brindar soporte y atención postventa.</li>
              <li>Cumplir obligaciones legales y tributarias.</li>
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              4. Protección de los datos
            </h2>
            <p className="mt-3">
              LensHubPeru adopta medidas técnicas, organizativas y legales
              necesarias para garantizar la seguridad y confidencialidad de los
              datos personales, evitando su alteración, pérdida o acceso no
              autorizado.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              5. Compartición de datos
            </h2>
            <p className="mt-3">
              Los datos podrán ser compartidos con terceros únicamente cuando
              sea necesario para la prestación del servicio, como operadores
              logísticos o plataformas de pago, respetando siempre la normativa
              vigente.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              6. Derechos del titular de los datos
            </h2>
            <p className="mt-3">
              El usuario puede ejercer sus derechos de acceso, rectificación,
              cancelación y oposición (ARCO), conforme a la Ley N° 29733.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              7. Uso de cookies
            </h2>
            <p className="mt-3">
              Este sitio puede utilizar cookies para mejorar la experiencia del
              usuario y analizar el comportamiento de navegación.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              8. Modificaciones de la política
            </h2>
            <p className="mt-3">
              LensHubPeru se reserva el derecho de modificar esta política en
              cualquier momento. Las modificaciones serán publicadas en esta
              misma página.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              9. Legislación aplicable
            </h2>
            <p className="mt-3">
              La presente política se rige por la Ley N° 29733 – Ley de
              Protección de Datos Personales del Perú y su reglamento.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}