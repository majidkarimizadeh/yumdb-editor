import React, { PureComponent } from 'react';
import i18n, { languages } from '../../locales';
import { Menu, Icon } from 'antd';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.module.less';

export default class SelectLang extends PureComponent {
  changeLang = ({ key }) => {
    i18n.changeLanguage(key)
  };

  render() {
    const { className } = this.props;
    const selectedLang = i18n.language
    const langMenu = (
      <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={this.changeLang}>
        {languages.map(lng => (
          <Menu.Item key={lng.key}>
            <span role="img" aria-label={lng.label}>
              {lng.icon}
            </span>{' '}
            {lng.label}
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <HeaderDropdown overlay={langMenu} placement="bottomRight">
        <span className={classNames(styles.dropDown, className)}>
          <Icon type="global" />
        </span>
      </HeaderDropdown>
    );
  }
}
