import { render, screen } from '@testing-library/react'
import { ActiveLink } from '.'

jest.mock('next/router', () => {
    return {
        useRouter(){
            return {
                asPath: '/'
            }
        }
    }
})


describe('ActiveLink Component', () =>{
    it('renders correctly', ()=>{
       render(
            <ActiveLink href="/" activeClassName="active">
                <a>HOME</a>
            </ActiveLink>
        )
        expect(screen.getByText('HOME')).toBeInTheDocument()
    })
    
    
    it('with active class', ()=>{
       render(
            <ActiveLink href="/" activeClassName="active">
                <a>HOME</a>
            </ActiveLink>
        )
        expect(screen.getByText('HOME')).toHaveClass('active')
    })
})

