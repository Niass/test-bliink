import {formatDate} from '../dateFormat'

test('formatDate formats the date to look nice', () => {
  expect(formatDate(new Date('October 18, 1988'))).toBe('18/10/1988')
})
