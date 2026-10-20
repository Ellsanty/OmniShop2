# ADR-001: Diseño del almacenamiento del proyecto en Amazon S3

- **Fecha:** 13 de Octubre de 2026
- **Autor:** Santiago José Penso Peña
- **Estado:** Aceptada

## Contexto
El proyecto e-commerce OmniShop contaba inicialmente con el frontend estático publicado en un bucket público de Amazon S3, pero carecía de una estrategia de almacenamiento estructurada, persistencia segura y protección frente a errores humanos o fallos catastróficos. Ante un borrado accidental de archivos clave como el index.html, el sitio quedaba inhabilitado de inmediato. Adicionalmente, el sistema requiere resguardar de forma confidencial y organizada los respaldos de bases de datos, fichas técnicas y facturas de los clientes, optimizando los costos operativos a largo plazo mediante una política automatizada de retención.

## Decisión
Se adoptó una arquitectura basada en dos buckets independientes en la región us-east-1:
1. **Bucket Público (`cuc-bp-eq01-penso-sitio-2026`):** Destinado exclusivamente al alojamiento web estático (*Static Website Hosting*) para servir el frontend de la tienda.
2. **Bucket Privado (`cuc-bp-eq01-penso-privado-2026`):** Configurado con *Block Public Access* estricto para albergar la información interna estructurada mediante prefijos lógicos (`uploads/`, `respaldos/`, `documentos/`).
3. **Control de Versiones:** Activado en ambos buckets para garantizar la recuperación ante desastres (*Disaster Recovery*) y mitigar borrados accidentales mediante el uso de marcadores de eliminación (*Delete Markers*).
4. **Ciclo de Vida:** Implementación de una regla de automatización (`Regla-Archivado-Privado`) para transicionar los objetos vigentes hacia la clase de almacenamiento **S3 Standard-Infrequent Access (Standard-IA)** tras 30 días, reduciendo los costos operativos de almacenamiento histórico en aproximadamente un 45%.

## Alternativas consideradas
1. **Utilizar un único bucket para todo (tanto la web como los datos privados):** Se descartó porque expone innecesariamente los activos sensibles y vulnera el principio de mínimo privilegio, ya que cualquier fallo en las políticas de acceso web podría comprometer la información interna y los respaldos de la base de datos.
2. **Alojar el sitio web estático en Netlify o Vercel en lugar de S3:** Se descartó debido a que el alcance del laboratorio y la arquitectura institucional exigen el uso nativo de los servicios de AWS Learner Lab para la integración directa con políticas de control, versionado y costos en la nube.
3. **Mantener el versionado activo sin reglas de ciclo de vida:** Se descartó porque la acumulación ilimitada de versiones antiguas de archivos que cambian de manera frecuente incrementaría de forma descontrolada el consumo de gigabytes y la factura mensual de AWS.

## Consecuencias
### Positivas
- Alta disponibilidad y rendimiento en la entrega del frontend de la tienda web.
- Resiliencia y recuperación inmediata ante borrados accidentales de archivos sin intervención manual compleja.
- Optimización financiera continua gracias a la migración automática de datos a clases de almacenamiento de menor costo.

### Costos o desventajas que aceptamos
- Un mayor consumo de espacio en almacenamiento derivado de la acumulación de versiones históricas, el cual se mitiga y controla mediante la regla de ciclo de vida.

### Qué habría que revisar más adelante
- Monitorear el crecimiento del almacenamiento histórico en Standard-IA y evaluar la introducción de reglas de transición hacia Amazon Glacier para datos de respaldo con más de 90 días de antigüedad.