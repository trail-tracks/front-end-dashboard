import { registerSchema, addressSchema, loginSchema } from '@/schema/authSchema';

describe('Auth Schemas Validation', () => {
  describe('registerSchema', () => {
    it('valida dados corretos', () => {
      const validData = {
        name: 'Parque Estadual',
        email: 'teste@email.com',
        password: 'Senha123!',
        ddi: '+55',
        ddd: '11',
        telefone: '999999999',
        complemento: 'Núcleo Caraguatatuba',
      };

      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('rejeita nome muito curto', () => {
      const invalidData = {
        name: 'A',
        email: 'teste@email.com',
        password: 'Senha123!',
        ddi: '+55',
        ddd: '11',
        telefone: '999999999',
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('O nome deve ter pelo menos 2 caracteres');
      }
    });

    it('rejeita email inválido', () => {
      const invalidData = {
        name: 'Parque Estadual',
        email: 'email-invalido',
        password: 'Senha123!',
        ddi: '+55',
        ddd: '11',
        telefone: '999999999',
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email inválido');
      }
    });

    it('rejeita senha fraca', () => {
      const invalidData = {
        name: 'Parque Estadual',
        email: 'teste@email.com',
        password: '123',
        ddi: '+55',
        ddd: '11',
        telefone: '999999999',
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('A senha deve ter pelo menos 8 caracteres');
      }
    });

    it('rejeita senha sem maiúscula', () => {
      const invalidData = {
        name: 'Parque Estadual',
        email: 'teste@email.com',
        password: 'senha123!',
        ddi: '+55',
        ddd: '11',
        telefone: '999999999',
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('A senha deve conter pelo menos uma letra maiúscula');
      }
    });

    it('rejeita DDD inválido', () => {
      const invalidData = {
        name: 'Parque Estadual',
        email: 'teste@email.com',
        password: 'Senha123!',
        ddi: '+55',
        ddd: '1',
        telefone: '999999999',
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('O DDD deve ter pelo menos 2 dígitos');
      }
    });
  });

  describe('addressSchema', () => {
    it('valida endereço correto', () => {
      const validData = {
        zipCode: '11663702',
        address: 'Rua das Flores',
        number: '123',
        city: 'São Paulo',
        state: 'SP',
        addressComplement: 'Apto 1',
      };

      const result = addressSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('rejeita CEP inválido', () => {
      const invalidData = {
        zipCode: '123',
        address: 'Rua das Flores',
        number: '123',
        city: 'São Paulo',
        state: 'SP',
      };

      const result = addressSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('O CEP deve ter 8 dígitos');
      }
    });

    it('rejeita estado inválido', () => {
      const invalidData = {
        zipCode: '12345-678',
        address: 'Rua das Flores',
        number: '123',
        city: 'São Paulo',
        state: 'São Paulo',
      };

      const result = addressSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('O estado deve ter exatamente 2 letras');
      }
    });
  });

  describe('loginSchema', () => {
    it('valida login correto', () => {
      const validData = {
        email: 'teste@email.com',
        password: 'Senha123!',
      };

      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('rejeita email inválido', () => {
      const invalidData = {
        email: 'email-invalido',
        password: 'Senha123!',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email inválido');
      }
    });

    it('rejeita senha fraca', () => {
      const invalidData = {
        email: 'teste@email.com',
        password: '123',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('A senha deve ter pelo menos 8 caracteres');
      }
    });
  });
});

