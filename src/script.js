<script>
        const STORAGE_KEY = 'vtrack_system_state_v5';

        // Actual photos matched to vehicle category & body style
        const CATEGORY_PHOTOS = {
            Sedan: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
            SUV: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
            Van: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
            'L300/Truck': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
            Motorcycle: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
        };

        function getActualPhotoFallback(category) {
            return CATEGORY_PHOTOS[category] || CATEGORY_PHOTOS.Sedan;
        }

        function handlePhotoFallback(imgEl) {
            const fallback = imgEl.getAttribute('data-fallback');
            if (fallback) {
                imgEl.setAttribute('src', fallback);
                imgEl.removeAttribute('data-fallback');
            }
        }

        // Complete 15-vehicle fleet matching the V-Track Rental Fleet Inventory Spreadsheet
        const defaultState = {
            currentUser: null,
            users: [],
            vehicles: [
                {
                    id: 'VEH-1',
                    brand: 'Toyota',
                    name: 'Vios XLE',
                    category: 'Sedan',
                    seater: 5,
                    price: 1600,
                    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
                    maintenance: false
                },
                {
                    id: 'VEH-2',
                    brand: 'Toyota',
                    name: 'Fortuner G',
                    category: 'SUV',
                    seater: 6,
                    price: 2800,
                    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
                    maintenance: false
                },
                {
                    id: 'VEH-3',
                    brand: 'Nissan',
                    name: 'Urvan Cargo',
                    category: 'Van',
                    seater: 6,
                    price: 3200,
                    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
                    maintenance: true
                },
                {
                    id: 'VEH-4',
                    brand: 'Mitsubishi',
                    name: 'Mirage G4',
                    category: 'Sedan',
                    seater: 5,
                    price: 1400,
                    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
                    maintenance: false
                },
                {
                    id: 'VEH-5',
                    brand: 'Mitsubishi',
                    name: 'L300 FB',
                    category: 'L300/Truck',
                    seater: 3,
                    price: 2200,
                    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
                    maintenance: false
                },
                {
                    id: 'VEH-6',
                    brand: 'Toyota',
                    name: 'Hiace Commuter',
                    category: 'Van',
                    seater: 6,
                    price: 3500,
                    image: 'https://images.unsplash.com/photo-1570125909232-eb263c1880e7?auto=format&fit=crop&w=800&q=80',
                    maintenance: false
                },
                {
                    id: 'VEH-7',
                    brand: 'Honda',
                    name: 'Click 160',
                    category: 'Motorcycle',
                    seater: 1,
                    price: 500,
                    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
                    maintenance: false
                },
                {
                    id: 'VEH-8',
                    brand: 'Toyota',
                    name: 'Wigo G',
                    category: 'Sedan',
                    seater: 4,
                    price: 1200,
                    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80',
                    maintenance: false
                },
                {
                    id: 'VEH-9',
                    brand: 'Suzuki',
                    name: 'S-Presso',
                    category: 'Sedan',
                    seater: 4,
                    price: 1100,
                    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
                    maintenance: false
                },
                {
                    id: 'VEH-10',
                    brand: 'Honda',
                    name: 'Brio RS',
                    category: 'Sedan',
                    seater: 4,
                    price: 1300,
                    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
                    maintenance: false
                },
                {
                    id: 'VEH-11',
                    brand: 'Honda',
                    name: 'City RS',
                    category: 'Sedan',
                    seater: 5,
                    price: 1800,
                    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80',
                    maintenance: false
                },
                {
                    id: 'VEH-12',
                    brand: 'Nissan',
                    name: 'Almera VL',
                    category: 'Sedan',
                    seater: 5,
                    price: 1700,
                    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
                    maintenance: true
                },
                {
                    id: 'VEH-13',
                    brand: 'Toyota',
                    name: 'Innova E',
                    category: 'SUV',
                    seater: 6,
                    price: 2500,
                    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
                    maintenance: false
                },
                {
                    id: 'VEH-14',
                    brand: 'Suzuki',
                    name: 'Carry Utility Van',
                    category: 'L300/Truck',
                    seater: 3,
                    price: 1900,
                    image: 'https://images.unsplash.com/photo-1586191582112-f87833d28070?auto=format&fit=crop&w=800&q=80',
                    maintenance: false
                },
                {
                    id: 'VEH-15',
                    brand: 'Yamaha',
                    name: 'NMAX 155',
                    category: 'Motorcycle',
                    seater: 1,
                    price: 600,
                    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
                    maintenance: false
                }
            ],
            reservations: [
                {
                    id: 'VT-1001',
                    issuedDate: '11/25/2026',
                    riderName: 'Mark Santos',
                    riderPhone: '0917 234 5678',
                    vehicleId: 'VEH-2',
                    vehicleLabel: 'Toyota Fortuner G',
                    startDate: '2026-11-25',
                    endDate: '2026-11-27',
                    days: 3,
                    totalAmount: 8400,
                    status: 'Approved'
                },
                {
                    id: 'VT-1002',
                    issuedDate: '11/25/2026',
                    riderName: 'Angela Reyes',
                    riderPhone: '0918 345 6789',
                    vehicleId: 'VEH-6',
                    vehicleLabel: 'Toyota Hiace Commuter',
                    startDate: '2026-11-26',
                    endDate: '2026-11-27',
                    days: 2,
                    totalAmount: 7000,
                    status: 'Pending'
                },
                {
                    id: 'VT-1003',
                    issuedDate: '11/25/2026',
                    riderName: 'Carlo Mendoza',
                    riderPhone: '0919 456 7890',
                    vehicleId: 'VEH-9',
                    vehicleLabel: 'Suzuki S-Presso',
                    startDate: '2026-11-25',
                    endDate: '2026-11-26',
                    days: 2,
                    totalAmount: 2200,
                    status: 'Approved'
                },
                {
                    id: 'VT-1004',
                    issuedDate: '11/25/2026',
                    riderName: 'Bianca Cruz',
                    riderPhone: '0920 567 8901',
                    vehicleId: 'VEH-14',
                    vehicleLabel: 'Suzuki Carry Utility Van',
                    startDate: '2026-11-26',
                    endDate: '2026-11-28',
                    days: 3,
                    totalAmount: 5700,
                    status: 'Pending'
                }
            ]
        };

        let state = loadState();
        let selectedCategory = 'ALL';
        let selectedSeater = 'ALL';
        let searchQuery = '';
        let activeBookingVehicle = null;

        function loadState() {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (!saved) return structuredClone(defaultState);
                return { ...structuredClone(defaultState), ...JSON.parse(saved) };
            } catch {
                return structuredClone(defaultState);
            }
        }

        function saveState() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }

        function switchTab(tabName) {
            ['catalog', 'reservations', 'admin'].forEach(t => {
                document.getElementById(`tab-${t}`)?.classList.add('hidden');
                const navBtn = document.getElementById(`nav-${t}`);
                if (navBtn) {
                    navBtn.classList.remove('border-blue-500', 'text-blue-400');
                    navBtn.classList.add('border-transparent', 'text-gray-400');
                }
            });
            document.getElementById(`tab-${tabName}`)?.classList.remove('hidden');
            const activeNav = document.getElementById(`nav-${tabName}`);
            if (activeNav) {
                activeNav.classList.remove('border-transparent', 'text-gray-400');
                activeNav.classList.add('border-blue-500', 'text-blue-400');
            }
        }

        function handleSearch(value) {
            searchQuery = value.trim().toLowerCase();
            renderFleet();
        }

        function renderFilters() {
            const categories = ['ALL', 'Sedan', 'SUV', 'Van', 'L300/Truck', 'Motorcycle'];
            const seaters = ['ALL', '1', '3', '4', '5', '6'];

            document.getElementById('category-filters').innerHTML = categories.map(cat => {
                const active = selectedCategory === cat;
                return `<button onclick="selectCategory('${cat}')" class="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    active ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-blue-500'
                }">${cat === 'ALL' ? 'All Categories' : cat}</button>`;
            }).join('');

            document.getElementById('seater-filters').innerHTML = seaters.map(s => {
                const active = selectedSeater === s;
                const label = s === 'ALL' ? 'Any' : s === '6' ? '6+ Seats' : `${s} ${s === '1' ? 'Seat' : 'Seats'}`;
                return `<button onclick="selectSeater('${s}')" class="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    active ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-white'
                }">${label}</button>`;
            }).join('');
        }

        function selectCategory(cat) {
            selectedCategory = cat;
            renderFilters();
            renderFleet();
        }

        function selectSeater(seater) {
            selectedSeater = seater;
            renderFilters();
            renderFleet();
        }

        function getVehicleStatus(vehicle) {
            if (vehicle.maintenance) return 'Maintenance';
            const hasActive = state.reservations.some(
                r => r.vehicleId === vehicle.id && (r.status === 'Pending' || r.status === 'Approved')
            );
            return hasActive ? 'Reserved' : 'Available';
        }

        function renderFleet() {
            let available = 0, reserved = 0, maintenance = 0;
            state.vehicles.forEach(v => {
                const st = getVehicleStatus(v);
                if (st === 'Available') available++;
                else if (st === 'Reserved') reserved++;
                else maintenance++;
            });

            document.getElementById('stat-total').textContent = state.vehicles.length;
            document.getElementById('stat-available').textContent = available;
            document.getElementById('stat-reserved').textContent = reserved;
            document.getElementById('stat-maintenance').textContent = maintenance;

            let filtered = state.vehicles.filter(v => {
                const matchesCat = selectedCategory === 'ALL' || v.category === selectedCategory;
                const matchesSeater = selectedSeater === 'ALL' || (selectedSeater === '6' ? Number(v.seater) >= 6 : String(v.seater) === selectedSeater);
                const matchesSearch = !searchQuery || `${v.brand} ${v.name} ${v.category}`.toLowerCase().includes(searchQuery);
                return matchesCat && matchesSeater && matchesSearch;
            });

            const sortBy = document.getElementById('sort-select')?.value || 'default';
            if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
            else if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
            else if (sortBy === 'name') filtered.sort((a, b) => `${a.brand} ${a.name}`.localeCompare(`${b.brand} ${b.name}`));

            const grid = document.getElementById('fleet-grid');
            if (!filtered.length) {
                grid.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400 text-sm">No vehicles match your filter.</div>`;
                return;
            }

            grid.innerHTML = filtered.map(v => {
                const status = getVehicleStatus(v);
                const badgeMap = {
                    Available: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
                    Reserved: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
                    Maintenance: 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                };
                const seatLabel = Number(v.seater) >= 6 ? '6+ Seater' : `${v.seater} Seater`;
                const primaryPhoto = v.image && v.image.trim() ? v.image.trim() : getActualPhotoFallback(v.category);
                const fallbackPhoto = getActualPhotoFallback(v.category);
                return `
                    <div class="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg">
                        <div>
                            <img src="${primaryPhoto}" alt="${v.brand} ${v.name}" data-fallback="${fallbackPhoto}" onerror="handlePhotoFallback(this)" class="w-full h-44 object-cover bg-gray-900">
                            <div class="p-4 space-y-2">
                                <div class="flex items-center justify-between gap-2">
                                    <span class="text-[11px] uppercase tracking-wider text-blue-400 font-bold">${v.category} • ${seatLabel}</span>
                                    <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeMap[status]}">${status}</span>
                                </div>
                                <h3 class="text-lg font-bold text-white">${v.brand} ${v.name}</h3>
                                <p class="text-base font-extrabold text-emerald-400">₱${Number(v.price).toLocaleString()} <span class="text-xs font-normal text-gray-400">/ day</span></p>
                            </div>
                        </div>
                        <div class="px-4 pb-4">
                            <button onclick="openBookingModal('${v.id}')" ${status !== 'Available' ? 'disabled' : ''} class="w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                                status === 'Available' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            }">${status === 'Available' ? 'Book Vehicle' : status}</button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function renderAdminFleet() {
            const tbody = document.getElementById('admin-fleet-table-body');
            if (!tbody) return;
            tbody.innerHTML = state.vehicles.map(v => {
                const activeCount = state.reservations.filter(r => r.vehicleId === v.id && (r.status === 'Pending' || r.status === 'Approved')).length;
                const seatLabel = Number(v.seater) >= 6 ? '6+ Seater' : `${v.seater} Seater`;
                return `
                    <tr>
                        <td class="px-6 py-4 font-semibold text-white">${v.brand} ${v.name}</td>
                        <td class="px-6 py-4 text-xs">${v.category} (${seatLabel})</td>
                        <td class="px-6 py-4 text-xs font-bold text-emerald-400">₱${Number(v.price).toLocaleString()}</td>
                        <td class="px-6 py-4 text-xs">${v.maintenance ? '<span class="text-rose-400 font-bold">Maintenance</span>' : '<span class="text-emerald-400">Operational</span>'}</td>
                        <td class="px-6 py-4 text-xs">${activeCount}</td>
                        <td class="px-6 py-4 text-right space-x-2 text-xs">
                            <button onclick="openVehicleModal('${v.id}')" class="px-2.5 py-1 bg-blue-600/20 text-blue-300 rounded-lg hover:bg-blue-600/30">Edit</button>
                            <button onclick="deleteVehicle('${v.id}')" class="px-2.5 py-1 bg-rose-600/20 text-rose-300 rounded-lg hover:bg-rose-600/30">Delete</button>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        function openVehicleModal(vehicleId = null) {
            document.getElementById('vehicle-form').reset();
            document.getElementById('vehicle-id').value = '';
            document.getElementById('vehicle-modal-title').textContent = 'Add New Vehicle';
            if (vehicleId) {
                const v = state.vehicles.find(item => item.id === vehicleId);
                if (v) {
                    document.getElementById('vehicle-modal-title').textContent = 'Edit Vehicle';
                    document.getElementById('vehicle-id').value = v.id;
                    document.getElementById('vehicle-brand').value = v.brand;
                    document.getElementById('vehicle-name').value = v.name;
                    document.getElementById('vehicle-category').value = v.category;
                    document.getElementById('vehicle-seater').value = Number(v.seater) >= 6 ? '6' : String(v.seater);
                    document.getElementById('vehicle-price').value = v.price;
                    document.getElementById('vehicle-image').value = v.image;
                    document.getElementById('vehicle-maintenance').checked = Boolean(v.maintenance);
                }
            }
            document.getElementById('modal-vehicle').classList.remove('hidden');
        }

        function closeVehicleModal() {
            document.getElementById('modal-vehicle').classList.add('hidden');
        }

        function saveVehicle(event) {
            event.preventDefault();
            const id = document.getElementById('vehicle-id').value;
            const nextNum = state.vehicles.length + 1;
            const payload = {
                id: id || `VEH-${nextNum}`,
                brand: document.getElementById('vehicle-brand').value.trim(),
                name: document.getElementById('vehicle-name').value.trim(),
                category: document.getElementById('vehicle-category').value,
                seater: Number(document.getElementById('vehicle-seater').value),
                price: Number(document.getElementById('vehicle-price').value),
                image: document.getElementById('vehicle-image').value.trim(),
                maintenance: document.getElementById('vehicle-maintenance').checked
            };
            if (id) {
                const idx = state.vehicles.findIndex(v => v.id === id);
                if (idx >= 0) state.vehicles[idx] = payload;
            } else {
                state.vehicles.push(payload);
            }
            saveState();
            closeVehicleModal();
            renderFleet();
            renderAdminFleet();
        }

        function deleteVehicle(vehicleId) {
            state.vehicles = state.vehicles.filter(v => v.id !== vehicleId);
            saveState();
            renderFleet();
            renderAdminFleet();
        }

        function openBookingModal(vehicleId) {
            const vehicle = state.vehicles.find(v => v.id === vehicleId);
            if (!vehicle || getVehicleStatus(vehicle) !== 'Available') return;
            activeBookingVehicle = vehicle;
            document.getElementById('booking-form').reset();
            document.getElementById('booking-vehicle-id').value = vehicle.id;
            const seatLabel = Number(vehicle.seater) >= 6 ? '6+ Seater' : `${vehicle.seater} Seater`;
            document.getElementById('booking-vehicle-title').textContent = `${vehicle.brand} ${vehicle.name} (${vehicle.category}, ${seatLabel})`;

            const today = new Date().toISOString().split('T')[0];
            document.getElementById('booking-start-date').value = today;
            document.getElementById('booking-end-date').value = today;

            const user = state.currentUser || { name: 'Guest Rider' };
            document.getElementById('booking-rider-name-display').textContent = user.name;

            document.getElementById('booking-error-msg').classList.add('hidden');
            calculateRentalCost();
            document.getElementById('modal-booking').classList.remove('hidden');
        }

        function closeBookingModal() {
            document.getElementById('modal-booking').classList.add('hidden');
            activeBookingVehicle = null;
        }

        function calculateRentalCost() {
            if (!activeBookingVehicle) return;
            const startVal = document.getElementById('booking-start-date').value;
            const endVal = document.getElementById('booking-end-date').value;
            const errorEl = document.getElementById('booking-error-msg');
            const dailyRate = Number(activeBookingVehicle.price);
            document.getElementById('booking-daily-rate').textContent = `₱${dailyRate.toLocaleString()}.00`;
            if (!startVal || !endVal) return;

            const diffDays = Math.ceil((new Date(endVal) - new Date(startVal)) / (1000 * 60 * 60 * 24)) + 1;
            if (diffDays <= 0) {
                errorEl.textContent = 'End date must be on or after the start date.';
                errorEl.classList.remove('hidden');
                document.getElementById('booking-duration-days').textContent = '0 Days';
                document.getElementById('booking-total-cost').textContent = '₱0.00';
                return;
            }

            errorEl.classList.add('hidden');
            const total = diffDays * dailyRate;

            document.getElementById('booking-duration-days').textContent = `${diffDays} ${diffDays === 1 ? 'Day' : 'Days'}`;
            document.getElementById('booking-total-cost').textContent = `₱${total.toLocaleString()}.00`;
        }

        function confirmBooking(event) {
            event.preventDefault();
            if (!activeBookingVehicle) return;
            const startDate = document.getElementById('booking-start-date').value;
            const endDate = document.getElementById('booking-end-date').value;
            const diffDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
            if (diffDays <= 0) return;

            const user = state.currentUser;
            const totalAmount = diffDays * Number(activeBookingVehicle.price);

            const contract = {
                id: `VT-${Math.floor(1000 + Math.random() * 9000)}`,
                issuedDate: new Date().toLocaleDateString('en-PH'),
                riderName: user.name,
                riderPhone: user.phone || 'N/A',
                vehicleId: activeBookingVehicle.id,
                vehicleLabel: `${activeBookingVehicle.brand} ${activeBookingVehicle.name}`,
                startDate,
                endDate,
                days: diffDays,
                totalAmount,
                status: 'Pending'
            };

            state.reservations.unshift(contract);
            saveState();
            closeBookingModal();
            enterMainApp();
            switchTab('reservations');
        }

        function renderReservations() {
            const tbody = document.getElementById('reservations-table-body');
            if (!tbody) return;
            const statusFilter = document.getElementById('reservation-filter-status')?.value || 'ALL';
            const isAdmin = state.currentUser?.role === 'admin';

            const rows = state.reservations.filter(r => {
                const ownerMatch = isAdmin || r.riderName === state.currentUser?.name;
                const statusMatch = statusFilter === 'ALL' || r.status === statusFilter;
                return ownerMatch && statusMatch;
            });

            if (!rows.length) {
                tbody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-gray-400 text-xs">No booking records found.</td></tr>`;
                return;
            }

            tbody.innerHTML = rows.map(r => {
                const canCancel = r.status === 'Pending' || r.status === 'Approved';
                return `
                    <tr>
                        <td class="px-6 py-4 font-mono text-xs font-bold text-blue-400">#${r.id}</td>
                        <td class="px-6 py-4 text-xs"><strong>${r.riderName}</strong></td>
                        <td class="px-6 py-4 text-xs font-semibold text-white">${r.vehicleLabel}</td>
                        <td class="px-6 py-4 text-xs">${r.startDate} to ${r.endDate} (${r.days}d)</td>
                        <td class="px-6 py-4 text-xs font-bold text-white">₱${Number(r.totalAmount).toLocaleString()}</td>
                        <td class="px-6 py-4 text-xs font-bold">${r.status}</td>
                        <td class="px-6 py-4 text-right space-x-2 text-xs">
                            <button onclick="openReceiptModal('${r.id}')" class="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Paper</button>
                            ${canCancel ? `<button onclick="cancelReservation('${r.id}')" class="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg">Cancel</button>` : ''}
                            ${isAdmin && r.status === 'Pending' ? `<button onclick="updateReservationStatus('${r.id}', 'Approved')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">Approve</button>` : ''}
                        </td>
                    </tr>
                `;
            }).join('');
        }

        function cancelReservation(id) {
            const item = state.reservations.find(r => r.id === id);
            if (!item) return;
            item.status = 'Cancelled';
            saveState();
            renderFleet();
            renderAdminFleet();
            renderReservations();
        }

        function updateReservationStatus(id, newStatus) {
            const item = state.reservations.find(r => r.id === id);
            if (item) {
                item.status = newStatus;
                saveState();
                renderFleet();
                renderAdminFleet();
                renderReservations();
            }
        }

        function openReceiptModal(id) {
            const r = state.reservations.find(item => item.id === id);
            if (!r) return;
            document.getElementById('contract-id').textContent = `#${r.id}`;
            document.getElementById('contract-issued-date').textContent = r.issuedDate;
            document.getElementById('contract-rider-name-header').textContent = r.riderName;
            document.getElementById('contract-rider-name').textContent = r.riderName;
            document.getElementById('contract-rider-signature-name').textContent = r.riderName;
            document.getElementById('contract-rider-phone').textContent = r.riderPhone;
            document.getElementById('contract-vehicle').textContent = r.vehicleLabel;
            document.getElementById('contract-dates').textContent = `${r.startDate} to ${r.endDate} (${r.days} days)`;
            document.getElementById('contract-total').textContent = `₱${Number(r.totalAmount).toLocaleString()}`;
            document.getElementById('modal-receipt').classList.remove('hidden');
        }

        function closeReceiptModal() {
            document.getElementById('modal-receipt').classList.add('hidden');
        }

        window.addEventListener('DOMContentLoaded', () => {
            if (state.currentUser) {
                enterMainApp();
            }
        });
    </script>
</body>
</html>








