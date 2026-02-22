// scripts/import-products.js
import fetch from 'node-fetch';
import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';

const SHEET_ID = '1wF2fxvHN4FBbsEZG5DA-1JB1k2y82ogsl0Rt4m2o5Xs';
const SHEET_NAME = 'products';

const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

async function importProducts() {
  console.log('📥 Descargando productos desde Google Sheets...');
  
  try {
    const response = await fetch(CSV_URL);
    const csvText = await response.text();
    
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim()
    });

    const productsByCategory = {};
    
  parsed.data.forEach(row => {
  // 👇 CAMBIO: Verificar que esté Activo Y tenga descripción
  if (row.ESTADO !== 'Activo' || !row.DESCRIPCION) return;
      
      const category = (row.CATEGORIA || 'Otros').trim().replace(/\s+/g, '');
      
      if (!productsByCategory[category]) {
        productsByCategory[category] = [];
      }
      
      // Limpiar precio: quitar $ y comas
      let precio = row['PRECIO UNITARIO'] || '0';
      precio = precio.replace('$', '').replace(/,/g, '').trim();
      
      productsByCategory[category].push({
        title: row.DESCRIPCION,
        subtitle: row.CODIGO || '',
        presentation: row.PRESENTACION || '',
        price: `$${precio}`,
        minOrder: row['MINIMO DE COMPRA'] || '',
        image: { src: row.IMAGEN || '/placeholder.png' }
      });
    });

    const outputPath = path.join(process.cwd(), 'src/data/products.js');
    
    let fileContent = '// 🤖 Archivo generado automáticamente - NO EDITAR MANUALMENTE\n';
    fileContent += '// Última actualización: ' + new Date().toLocaleString('es-AR') + '\n\n';
    
    Object.keys(productsByCategory).forEach(category => {
      const varName = category.toLowerCase().replace(/\s+/g, '');
      fileContent += `export const ${varName} = ${JSON.stringify(productsByCategory[category], null, 2)};\n\n`;
    });

    fs.writeFileSync(outputPath, fileContent, 'utf-8');
    
    console.log('✅ Productos importados exitosamente!');
    console.log(`📦 Categorías encontradas: ${Object.keys(productsByCategory).join(', ')}`);
    
    Object.keys(productsByCategory).forEach(cat => {
      console.log(`   - ${cat}: ${productsByCategory[cat].length} productos`);
    });
    
  } catch (error) {
    console.error('❌ Error al importar productos:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

importProducts();