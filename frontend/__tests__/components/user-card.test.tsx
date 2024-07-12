import { UserCard } from '@/components/user-card'
import type { User } from '@/types/user'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

jest.mock('@/components/user-avatar', () => ({
  UserAvatar: jest.fn(() => <div>UserAvatar</div>),
}))

describe('UserCard', () => {
  const user: Pick<
    User,
    'username' | 'immutableId' | 'displayName' | 'avatarUrl'
  > = {
    username: 'testuser',
    immutableId: '1',
    displayName: 'Test User',
    avatarUrl: 'http://example.com/avatar.jpg',
  }

  it('UserAvatarコンポーネントがレンダリングされる', () => {
    render(<UserCard user={user} />)
    expect(screen.getByText('UserAvatar')).toBeInTheDocument()
  })

  it('displayNameがレンダリングされる', () => {
    render(<UserCard user={user} />)
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })

  it('cardSizeがsでない場合にusernameがレンダリングされる', () => {
    render(<UserCard user={user} cardSize="m" />)
    expect(screen.getByText('testuser')).toBeInTheDocument()
  })

  it('cardSizeがsのときにusernameがレンダリングされない', () => {
    render(<UserCard user={user} cardSize="s" />)
    expect(screen.queryByText('testuser')).toBeNull()
  })

  it('各リンクに適切なhref属性が設定される', () => {
    render(<UserCard user={user} />)
    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', '/testuser')
    })
  })

  it('cardSizeに基づいて適切なクラスが設定される', () => {
    const { container } = render(<UserCard user={user} cardSize="l" />)
    expect(container.firstChild).toHaveClass(
      'flex-col gap-2 sm:flex-row sm:gap-4',
    )
  })

  it('childrenが渡された場合に正しくレンダリングされる', () => {
    render(
      <UserCard user={user}>
        <div>Child Component</div>
      </UserCard>,
    )
    expect(screen.getByText('Child Component')).toBeInTheDocument()
  })
})
