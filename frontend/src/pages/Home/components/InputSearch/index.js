import PropTypes from 'prop-types';

import {
  Container,
} from './styles';

export function InputSearch({ value, onChange }) {
  return (
    <Container>
      <input
        type="text"
        value={value}
        placeholder="Pesquise pelo nome"
        onChange={onChange}
      />
    </Container>
  );
}

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
