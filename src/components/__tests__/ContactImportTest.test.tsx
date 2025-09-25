import React from 'react'
import Contact from '../Contact'

describe('Contact Import Test', () => {
    it('should import Contact component without errors', () => {
        expect(Contact).toBeDefined()
        expect(typeof Contact).toBe('function')
    })
})