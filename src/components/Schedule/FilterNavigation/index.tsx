import React, { useState, useEffect } from 'react'
import { PossibleFilter, Filter } from 'types'
import { getDate } from 'utils/dateTime'
import SpeakerFilterItem from './SpeakerFIlter'

function FilterNavigationItem({
  possibleFilter,
  onItemSelect,
  selectedItems,
}: {
  possibleFilter: PossibleFilter
  onItemSelect: (filter: Filter) => void
  selectedItems: Filter[]
}) {
  const { type, value } = possibleFilter

  const isSelected = (item: string) => selectedItems.some((selectedItem) => selectedItem.value === item)

  if (type === 'speaker') {
    return <SpeakerFilterItem options={value} selectedItems={selectedItems} onItemSelect={onItemSelect} />
  }

  return (
    <div className="flex flex-col justify-between box-content p-4">
      <div className="flex flex-row flex-wrap">
        <select className="p-3 border-2  bg-black text-white border-black">
          <option>{type}</option>
          {value?.map((item, index) => (
            <option key={`${type}-${item}-${index}`} onClick={() => onItemSelect({ type, value: item })}>
              {type === 'day' ? getDate(item) : item}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default function FilterNavigation({
  possibleFilters,
  onItemSelect,
  selectedItems,
  title,
}: {
  possibleFilters: PossibleFilter[]
  onItemSelect: (filter: Filter) => void
  selectedItems: Filter[]
  title?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setIsMobile(window.innerWidth < 600)
      }
      window.addEventListener('resize', handleResize)
      handleResize()
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (isMobile) {
    return (
      <div className="bg-black opacity-80 text-white mb-4 cursor-pointer" onClick={() => setIsOpen(true)}>
        <div className="flex flex-row justify-between items-center px-7 lg:px-8 py-4">
          <p>Filter</p>
        </div>
      </div>
    )
  }

  return (
    <div className=" opacity-80 relative px-4 lg:px-8 ">
      {isMobile && (
        <div className="absolute top-0 right-0 p-2 cursor-pointer bg-black text-white" onClick={() => setIsOpen(false)}>
          ^
        </div>
      )}
      <div className="flex-wrap flex-row flex my-4">
        {possibleFilters.map((possibleFilter) => (
          <FilterNavigationItem key={possibleFilter.type} possibleFilter={possibleFilter} onItemSelect={onItemSelect} selectedItems={selectedItems} />
        ))}
      </div>
    </div>
  )
}
