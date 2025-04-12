import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const SidebarContainer = styled.aside`
  width: 240px;
  background-color: var(--sidebar-bg);
  box-shadow: var(--shadow);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
`;

export const MainContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const HeaderContainer = styled.header`
  background-color: var(--header-bg);
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

export const ContentContainer = styled.div`
  padding: 30px;
  overflow-y: auto;
  flex: 1;
`;

export const Card = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 20px;
  margin-bottom: 20px;
`;

export const Button = styled.button<{ primary?: boolean }>`
  background-color: ${props => props.primary ? 'var(--primary-color)' : 'white'};
  color: ${props => props.primary ? 'white' : 'var(--primary-color)'};
  padding: 8px 16px;
  border-radius: var(--border-radius);
  font-weight: 500;
  border: ${props => props.primary ? 'none' : '1px solid var(--primary-color)'};
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${props => props.primary ? 'var(--secondary-color)' : 'var(--background-color)'};
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 15px 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--background-color);
  font-weight: 600;
`;

export const NavItem = styled.li<{ active?: boolean }>`
  padding: 12px 15px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 0 20px 20px 0;
  transition: all 0.2s ease-in-out;
  background-color: ${props => props.active ? 'var(--background-color)' : 'transparent'};
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-color)'};
  font-weight: ${props => props.active ? '600' : '400'};
  display: flex;
  align-items: center;
  gap: 10px;
  
  &:hover {
    background-color: var(--background-color);
  }
`;

export const ProgressBar = styled.div<{ progress: number; color?: string }>`
  height: 8px;
  background-color: var(--progress-bg);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background-color: ${props => props.color || 'var(--primary-color)'};
    border-radius: 10px;
    transition: width 0.3s ease-in-out;
  }
`;

export const Avatar = styled.div<{ src?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--primary-color);
  background-image: ${props => props.src ? `url(${props.src})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
`; 