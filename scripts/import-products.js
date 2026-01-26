// scripts/import-products.js
import fetch from 'node-fetch';
import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';

// 👇 REEMPLAZA CON TU ID DE GOOGLE SHEET
const SHEET_ID = '1wF2fxvHN4FBbsEZG5DA-1JB1k2y82ogsl0Rt4m2o5Xs';
const SHEET_NAME = 'products'; // Nombre de la pestaña en Google Sheets

// URL para obtener CSV del Sheet
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

async function importProducts() {
  console.log('📥 Descargando productos desde Google Sheets...');
  
  try {
    const response = await fetch(CSV_URL);
    const csvText = await response.text();
    
    // Parsear CSV
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim()
    });

    // Filtrar solo productos activos y agrupar por categoría
    const productsByCategory = {};
    
    parsed.data.forEach(row => {
      // Saltar productos inactivos o sin nombre
      if (row.Estado !== 'Activo' || !row.Nombre) return;
      
      const category = row.Categoría || 'Otros';
      
      if (!productsByCategory[category]) {
        productsByCategory[category] = [];
      }
  
      productsByCategory[category].push({
        subtitle: row.Nombre,
        title: row.Codigo || '',
        price: `$${row.Precio}`,
        image: { src: row.Imagen || '/placeholder.png' }
      });
    });

    // Crear archivo JS con todos los productos
    const outputPath = path.join(process.cwd(), 'src/data/products.js');
    
    let fileContent = '// 🤖 Archivo generado automáticamente - NO EDITAR MANUALMENTE\n';
    fileContent += '// Última actualización: ' + new Date().toLocaleString('es-AR') + '\n\n';
    
    // Generar exports por categoría
    Object.keys(productsByCategory).forEach(category => {
      const varName = category.toLowerCase().replace(/\s+/g, '');
      fileContent += `export const ${varName} = ${JSON.stringify(productsByCategory[category], null, 2)};\n\n`;
    });

    // Escribir archivo
    fs.writeFileSync(outputPath, fileContent, 'utf-8');
    
    console.log('✅ Productos importados exitosamente!');
    console.log(`📦 Categorías encontradas: ${Object.keys(productsByCategory).join(', ')}`);
    
    // Mostrar resumen
    Object.keys(productsByCategory).forEach(cat => {
      console.log(`   - ${cat}: ${productsByCategory[cat].length} productos`);
    });
    
  } catch (error) {
    console.error('❌ Error al importar productos:', error);
    process.exit(1);
  }
}

importProducts();