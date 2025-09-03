const EnvConfigManager = require('../index');

// Create instance with encryption key
const env = new EnvConfigManager({
  encryptionKey: 'my-secret-encryption-key'
});

// Define schema with sensitive fields
const schema = {
  API_KEY: {
    type: 'string',
    required: true,
    description: 'External API key'
  },
  DATABASE_PASSWORD: {
    type: 'string',
    required: true,
    description: 'Database password'
  },
  MAX_CONNECTIONS: {
    type: 'number',
    default: 10,
    min: 1,
    max: 100,
    description: 'Maximum database connections'
  },
  ENABLE_CACHE: {
    type: 'boolean',
    default: true,
    description: 'Enable caching'
  },
  CACHE_CONFIG: {
    type: 'json',
    description: 'Cache configuration JSON'
  }
};

// Apply schema
env.defineSchema(schema);

// Set some values
env.set('API_KEY', 'sk-123456789');
env.set('DATABASE_PASSWORD', 'supersecretpassword');
env.set('MAX_CONNECTIONS', '20');
env.set('ENABLE_CACHE', 'true');
env.set('CACHE_CONFIG', '{"ttl": 3600, "maxSize": 1000}');

// Encrypt sensitive fields
env.encryptFields(['API_KEY', 'DATABASE_PASSWORD']);

// Save to .env file
env.save('.env');

console.log('✅ Configuration saved to .env file');

// Generate template
env.generateTemplate('.env.template');

console.log('✅ Template generated');

// Now load and decrypt
const env2 = new EnvConfigManager({
  encryptionKey: 'my-secret-encryption-key'
});

env2.defineSchema(schema);
env2.load();

// Decrypt sensitive fields
env2.decryptFields();

console.log('Loaded configuration:');
console.log('API_KEY:', env2.get('API_KEY'));
console.log('MAX_CONNECTIONS:', env2.getTyped('MAX_CONNECTIONS'));
console.log('CACHE_CONFIG:', env2.getTyped('CACHE_CONFIG'));
