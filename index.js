const EnvValidator = require('./lib/validator');
const EnvEncryptor = require('./lib/encryptor');
const EnvLoader = require('./lib/loader');
const EnvTemplate = require('./lib/template');

class EnvConfigManager {
  constructor(options = {}) {
    this.validator = new EnvValidator();
    this.encryptor = new EnvEncryptor(options.encryptionKey);
    this.loader = new EnvLoader();
    this.template = new EnvTemplate();
    
    this.config = {};
    this.schema = {};
    this.encryptedFields = [];
  }

  // Schema definition
  defineSchema(schema) {
    this.schema = schema;
    return this;
  }

  // Load environment
  load(envPath = '.env') {
    this.config = this.loader.load(envPath);
    return this;
  }

  // Validate configuration
  validate() {
    const result = this.validator.validate(this.config, this.schema);
    if (!result.isValid) {
      throw new Error(`Validation failed: ${result.errors.join(', ')}`);
    }
    return this;
  }

  // Get configuration value
  get(key, defaultValue = undefined) {
    return this.config[key] !== undefined ? this.config[key] : defaultValue;
  }

  // Set configuration value
  set(key, value) {
    this.config[key] = value;
    return this;
  }

  // Encrypt sensitive fields
  encryptFields(fields) {
    this.encryptedFields = fields;
    
    fields.forEach(field => {
      if (this.config[field]) {
        this.config[field] = this.encryptor.encrypt(this.config[field]);
      }
    });
    
    return this;
  }

  // Decrypt sensitive fields
  decryptFields() {
    this.encryptedFields.forEach(field => {
      if (this.config[field]) {
        this.config[field] = this.encryptor.decrypt(this.config[field]);
      }
    });
    
    return this;
  }

  // Save configuration to file
  save(filePath = '.env') {
    this.loader.save(filePath, this.config);
    return this;
  }

  // Generate template file
  generateTemplate(templatePath = '.env.template') {
    this.template.generate(templatePath, this.schema);
    return this;
  }

  // Get all configuration
  getAll() {
    return { ...this.config };
  }

  // Get configuration with type casting
  getTyped(key) {
    const value = this.get(key);
    const fieldSchema = this.schema[key];
    
    if (!fieldSchema || !fieldSchema.type) {
      return value;
    }
    
    switch (fieldSchema.type) {
      case 'number':
        return Number(value);
      case 'boolean':
        return value === 'true' || value === true;
      case 'json':
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      default:
        return value;
    }
  }

  // Merge with another configuration
  merge(otherConfig) {
    this.config = { ...this.config, ...otherConfig };
    return this;
  }

  // Check if configuration is valid
  isValid() {
    try {
      this.validate();
      return true;
    } catch {
      return false;
    }
  }

  // Get validation errors
  getValidationErrors() {
    const result = this.validator.validate(this.config, this.schema);
    return result.errors;
  }
}

module.exports = EnvConfigManager;
