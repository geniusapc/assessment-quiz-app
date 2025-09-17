import { readFileSync, writeFileSync } from 'fs'
import { readdir } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

async function fixJsExtensions(dir) {
    try {
        const files = await readdir(dir, { withFileTypes: true })

        for (const file of files) {
            const fullPath = join(dir, file.name)

            if (file.isDirectory()) {
                await fixJsExtensions(fullPath)
            } else if (extname(file.name) === '.js') {
                let content = readFileSync(fullPath, 'utf8')
                let changed = false

                // Add .js extension to all relative imports without extensions
                content = content.replace(
                    /from\s+['"](\.\.?\/[^'"]+)['"]/g,
                    (match, importPath) => {
                        // Skip if already has extension or is not a relative path
                        if (!importPath.startsWith('.') || importPath.match(/\.(js|ts|json|cjs|mjs|node)$/)) {
                            return match
                        }
                        changed = true
                        return `from '${importPath}.js'`
                    }
                )

                // Also fix dynamic imports and require statements if needed
                content = content.replace(
                    /import\(['"](\.\.?\/[^'"]+)['"]\)/g,
                    (match, importPath) => {
                        if (!importPath.startsWith('.') || importPath.match(/\.(js|ts|json|cjs|mjs|node)$/)) {
                            return match
                        }
                        changed = true
                        return `import('${importPath}.js')`
                    }
                )

                if (changed) {
                    writeFileSync(fullPath, content)
                    console.log(`✅ Fixed imports in: ${file.name}`)
                }
            }
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

// Run the fix
console.log('🔧 Fixing import extensions in all files...')
fixJsExtensions(join(__dirname, 'dist')).then(() => {
    console.log('🎉 All import extensions have been fixed!')
    console.log('🚀 You can now run: npm run start')
}).catch(console.error)